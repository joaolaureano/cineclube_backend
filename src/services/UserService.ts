import { getCustomRepository, getRepository } from "typeorm";
import { MovieUserStatus } from "../enum/MovieUserStatus";
import { Achievement, UserAchievement, UserMovie, UserTag } from "../models";
import { User } from "../models/User";
import {
  UserRepository,
  UserMovieRepository,
  MovieTagRepository,
  UserTagRepository,
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

const setUserTags = async (idMovie: string, idUser: string): Promise<void> => {
  const userTagRepository = getCustomRepository(UserTagRepository);
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

  const existingUserTags = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.tagId IN (${movieTagSql})`)
    .andWhere(`userTag.user_id = "${idUser}"`)
    .getMany();

  const leftTags = movieTagList.filter((tag) => {
    return existingUserTags.find((usertag) => usertag.tagId == tag.tagId)
      ? false
      : true;
  });

  existingUserTags.forEach((tag) => {
    const actualMovieTag = movieTagList.find(
      (movietag) => movietag.tagId == tag.tagId
    );
    if (actualMovieTag) {
      tag.totalPoint += actualMovieTag.weight;
    }
  });

  leftTags.forEach((movietag) => {
    const newUserTag = new UserTag();
    newUserTag.tagId = movietag.tagId;
    newUserTag.user_id = idUser;
    newUserTag.totalPoint = movietag.weight;
    existingUserTags.push(newUserTag);
  });

  await userTagRepository.save(existingUserTags);
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

    await setUserTags(idMovie, idUser);

    const result = await setAchievementProgress(idMovie, idUser);

    return result;
  } else {
    exists.status = status;

    await userMovieRepository.save(exists);

    await setUserTags(idMovie, idUser);

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
      await decreaseUserTagPoints(exists);

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

const decreaseUserTagPoints = async (userMovie: UserMovie): Promise<void> => {
  const userTagRepository = getCustomRepository(UserTagRepository);
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

  const existingUserTags = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.tagId IN (${movieTagSql})`)
    .andWhere(`userTag.user_id = "${userMovie.user_id}"`)
    .getMany();

  const removeList: UserTag[] = [];
  const updateList: UserTag[] = [];

  existingUserTags.forEach((userTag) => {
    const actualMovieTag = movieTagList.find(
      (movietag) => movietag.tagId == userTag.tagId
    );
    if (actualMovieTag) {
      userTag.totalPoint -= actualMovieTag.weight;
      if (userTag.totalPoint <= 0) {
        removeList.push(userTag);
      } else {
        updateList.push(userTag);
      }
    }
  });

  await userTagRepository.save(updateList);

  await userTagRepository.remove(removeList);
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
        await decreaseUserTagPoints(exists);
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
): Promise<UserTag[]> => {
  const userTagRespoitory = getRepository(UserTag);
  const userTags = tagIds.map((id) => {
    const userTag = new UserTag();
    userTag.tagId = id;
    userTag.user_id = user_id;
    userTag.totalPoint = 50;
    return userTag;
  });
  const insertedUserTags = await userTagRespoitory.save(userTags);
  return insertedUserTags;
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
