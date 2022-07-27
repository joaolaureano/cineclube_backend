import { getCustomRepository, getRepository } from "typeorm";
import { MovieUserStatus } from "../enum/MovieUserStatus";
import { Achievement, UserAchievement, UserMovie, user_tag } from "../models";
import { User } from "../models/User";
import {
  UserRepository,
  UserMovieRepository,
  MovieTagRepository,
  user_tagRepository,
  UserAchievementRepository,
  AchievementRepository,
} from "../repositories";

export interface userDetails {
  id: string;
  name: string;
  email?: string;
  photo_path?: string;
}

const createUser = async (userDetails: userDetails): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const newUser = new User();
  Object.assign(newUser, userDetails);

  newUser.randomness = 0;

  const result = await userRepository.save(newUser);

  return result;
};

const findUserById = async (id: string): Promise<User | undefined> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);

  return user;
};

const getUserMoviesByStatus = async (
  status: string,
  user_id: string
): Promise<UserMovie[]> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const movies = await userMovieRepository.find({
    where: { user_id, status },
    relations: ["movie", "movie.platforms"],
  });

  const moviesWithoutId = movies.map((movie) => {
    movie.user_id = "";
    return movie;
  });

  return moviesWithoutId;
};

const setuser_tags = async (idMovie: string, idUser: string): Promise<void> => {
  const user_tagRepository = getCustomRepository(user_tagRepository);
  const movieTagRepository = getCustomRepository(MovieTagRepository);

  const movieTagList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .where(`movieTag.movie_id = "${idMovie}"`)
    .getMany();

  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movie_id = "${idMovie}"`)
    .getSql();

  const existinguser_tags = await user_tagRepository
    .createQueryBuilder("user_tag")
    .where(`user_tag.tagId IN (${movieTagSql})`)
    .andWhere(`user_tag.user_id = "${idUser}"`)
    .getMany();

  const leftTags = movieTagList.filter((tag) => {
    return existinguser_tags.find((user_tag) => user_tag.tagId == tag.tagId)
      ? false
      : true;
  });

  existinguser_tags.forEach((tag) => {
    const actualMovieTag = movieTagList.find(
      (movietag) => movietag.tagId == tag.tagId
    );
    if (actualMovieTag) {
      tag.totalPoint += actualMovieTag.weight;
    }
  });

  leftTags.forEach((movietag) => {
    const newuser_tag = new user_tag();
    newuser_tag.tagId = movietag.tagId;
    newuser_tag.user_id = idUser;
    newuser_tag.totalPoint = movietag.weight;
    existinguser_tags.push(newuser_tag);
  });

  await user_tagRepository.save(existinguser_tags);
};

const setMovieStatusWatchedLiked = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<Achievement[] | undefined> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movie_id: idMovie, user_id: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movie_id = parseInt(idMovie);
    newUserMovieStatus.user_id = idUser;
    newUserMovieStatus.status = status;

    await userMovieRepository.save(newUserMovieStatus);

    await setuser_tags(idMovie, idUser);

    const result = await setAchievementProgress(idMovie, idUser);

    return result;
  } else {
    exists.status = status;

    await userMovieRepository.save(exists);

    await setuser_tags(idMovie, idUser);

    const result = await setAchievementProgress(idMovie, idUser);

    return result;
  }
};

const setMovieStatusWatchedDisliked = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<Achievement[] | undefined> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movie_id: idMovie, user_id: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movie_id = parseInt(idMovie);
    newUserMovieStatus.user_id = idUser;
    newUserMovieStatus.status = status;

    await userMovieRepository.save(newUserMovieStatus);

    const result = await setAchievementProgress(idMovie, idUser);

    return result;
  } else {
    if (exists.status == MovieUserStatus.WATCHED_AND_LIKED)
      await decreaseuser_tagPoints(exists);

    exists.status = status;

    await userMovieRepository.save(exists);

    const result = await setAchievementProgress(idMovie, idUser);

    return result;
  }
};

const setMovieStatusDontWantWatch = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<UserMovie> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movie_id: idMovie, user_id: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movie_id = parseInt(idMovie);
    newUserMovieStatus.user_id = idUser;
    newUserMovieStatus.status = status;

    const result = await userMovieRepository.save(newUserMovieStatus);

    return result;
  } else {
    exists.status = status;

    const result = await userMovieRepository.save(exists);

    return result;
  }
};

const decreaseuser_tagPoints = async (userMovie: UserMovie): Promise<void> => {
  const user_tagRepository = getCustomRepository(user_tagRepository);
  const movieTagRepository = getCustomRepository(MovieTagRepository);

  const movieTagList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .where(`movieTag.movie_id = "${userMovie.movie_id}"`)
    .getMany();

  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movie_id = "${userMovie.movie_id}"`)
    .getSql();

  const existinguser_tags = await user_tagRepository
    .createQueryBuilder("user_tag")
    .where(`user_tag.tagId IN (${movieTagSql})`)
    .andWhere(`user_tag.user_id = "${userMovie.user_id}"`)
    .getMany();

  const removeList: user_tag[] = [];
  const updateList: user_tag[] = [];

  existinguser_tags.forEach((user_tag) => {
    const actualMovieTag = movieTagList.find(
      (movietag) => movietag.tagId == user_tag.tagId
    );
    if (actualMovieTag) {
      user_tag.totalPoint -= actualMovieTag.weight;
      if (user_tag.totalPoint <= 0) {
        removeList.push(user_tag);
      } else {
        updateList.push(user_tag);
      }
    }
  });

  await user_tagRepository.save(updateList);

  await user_tagRepository.remove(removeList);
};
const decreaseUserAchievementsPoint = async (
  user_id: string,
  movie_id: string
) => {
  const movieTagRepository = getCustomRepository(MovieTagRepository);
  const userAchievementRepo = getCustomRepository(UserAchievementRepository);
  const achievementRepository = getCustomRepository(AchievementRepository);
  // Faz uma query para pegar as tags do filme
  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movie_id = "${movie_id}"`)
    .getSql();

  // Faz uma busca para pegar os achievements relacionados com as tags
  const achievementsByMovie = await achievementRepository
    .createQueryBuilder("userAchievement")
    .where(`userAchievement.tagId IN (${movieTagSql})`)
    .getMany();

  const achievementsByMovieMap = Object.assign(
    {},
    ...achievementsByMovie.map((x) => ({ [x.id]: x }))
  );

  // Faz uma busca dos achievements que o usuário já conquistou
  const existingUserAchivements = await userAchievementRepo
    .createQueryBuilder("userAchievement")
    .where(
      `userAchievement.achievementId IN (${Object.keys(
        achievementsByMovieMap
      )})`
    )
    .andWhere(`userAchievement.user_id = "${user_id}"`)
    .getMany();

  const toRemoveAchievement: UserAchievement[] = [];
  const toReduceAchievement: UserAchievement[] = [];

  existingUserAchivements.forEach((userAchievement) => {
    userAchievement.currentScore -= 1;
    if (userAchievement.currentScore === 0)
      toRemoveAchievement.push(userAchievement);
    else toReduceAchievement.push(userAchievement);
  });

  await userAchievementRepo.save(toReduceAchievement);
  await userAchievementRepo.remove(toRemoveAchievement);
};

const deleteUserMovie = async (
  idMovie: string,
  idUser: string
): Promise<UserMovie | undefined> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movie_id: idMovie, user_id: idUser },
  });
  if (exists) {
    if (
      exists.status == MovieUserStatus.WATCHED_AND_LIKED ||
      exists.status == MovieUserStatus.WATCHED_AND_DISLIKED
    ) {
      if (exists.status == MovieUserStatus.WATCHED_AND_LIKED)
        await decreaseuser_tagPoints(exists);
      await decreaseUserAchievementsPoint(idUser, idMovie);
    }

    const removed = await userMovieRepository.remove(exists);

    return removed;
  }
};
const setMovieStatusWantToWatch = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<UserMovie> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movie_id: idMovie, user_id: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movie_id = parseInt(idMovie);
    newUserMovieStatus.user_id = idUser;
    newUserMovieStatus.status = status;

    const result = await userMovieRepository.save(newUserMovieStatus);

    return result;
  } else {
    exists.status = status;

    const result = await userMovieRepository.save(exists);

    return result;
  }
};

const setSignUpPreferences = async (
  user_id: string,
  tagIds: number[]
): Promise<user_tag[]> => {
  const user_tagRespoitory = getRepository(user_tag);
  const user_tags = tagIds.map((id) => {
    const user_tag = new user_tag();
    user_tag.tagId = id;
    user_tag.user_id = user_id;
    user_tag.totalPoint = 50;
    return user_tag;
  });
  const inserteduser_tags = await user_tagRespoitory.save(user_tags);
  return inserteduser_tags;
};

const setAchievementProgress = async (
  movie_id: string,
  user_id: string
): Promise<Achievement[] | undefined> => {
  const movieTagRepository = getCustomRepository(MovieTagRepository);
  const userAchievementRepo = getCustomRepository(UserAchievementRepository);
  const achievementRepository = getCustomRepository(AchievementRepository);
  // Faz uma query para pegar as tags do filme
  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movie_id = "${movie_id}"`)
    .getSql();

  // Faz uma busca para pegar os achievements relacionados com as tags
  const achievementsByMovie = await achievementRepository
    .createQueryBuilder("userAchievement")
    .where(`userAchievement.tagId IN (${movieTagSql})`)
    .getMany();

  const achievementsByMovieMap = Object.assign(
    {},
    ...achievementsByMovie.map((x) => ({ [x.id]: x }))
  );

  // Faz uma busca dos achievements que o usuário já conquistou
  const existingUserAchivements = await userAchievementRepo
    .createQueryBuilder("userAchievement")
    .where(
      `userAchievement.achievementId IN (${Object.keys(
        achievementsByMovieMap
      )})`
    )
    .andWhere(`userAchievement.user_id = "${user_id}"`)
    .getMany();

  const userAchievementMap: {
    [achievementId: string]: UserAchievement;
  } = Object.assign(
    {},
    ...existingUserAchivements.map((x) => ({ [x.achievementId]: x }))
  );

  const allAchievementsIds = new Set([
    ...Object.keys(achievementsByMovieMap),
    ...Object.keys(userAchievementMap),
  ]);

  const retAchievementIds: string[] = [];

  allAchievementsIds.forEach((id) => {
    if (userAchievementMap[id]) {
      let changed = false;
      if (
        achievementsByMovieMap[id].targetScore >
        userAchievementMap[id].currentScore
      ) {
        changed = true;
      }
      userAchievementMap[id].currentScore += 1;
      //com as pontuações iguais e ocorrendo uma mudança, quer dizer que este deve ser retornado para ser exibido na tela
      if (
        changed &&
        achievementsByMovieMap[id].targetScore ===
          userAchievementMap[id].currentScore
      )
        retAchievementIds.push(id);
    } else {
      const userAchievementObj = new UserAchievement();
      userAchievementObj.achievementId = Number(id);
      userAchievementObj.currentScore = 1;
      userAchievementObj.user_id = user_id;
      userAchievementMap[id] = userAchievementObj;
    }
  });

  await userAchievementRepo.save(Object.values(userAchievementMap));

  //se existir algum achievement para retornar
  if (retAchievementIds.length !== 0) {
    const achievementsById = await achievementRepository
      .createQueryBuilder("achievements")
      .where(`achievements.id IN (${retAchievementIds})`)
      .getMany();

    return achievementsById;
  }

  return undefined;
};

export default {
  createUser,
  findUserById,
  setMovieStatusWatchedLiked,
  setMovieStatusWatchedDisliked,
  getUserMoviesByStatus,
  setMovieStatusDontWantWatch,
  setMovieStatusWantToWatch,
  deleteUserMovie,
  setSignUpPreferences,
  setAchievementProgress,
};
