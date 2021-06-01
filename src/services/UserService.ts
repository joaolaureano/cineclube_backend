import { getConnection, getCustomRepository, getRepository } from "typeorm";
import { MovieUserStatus } from "../enum/MovieUserStatus";
import { Movie, UserAchievement, UserMovie, UserTag } from "../models";
import { User } from "../models/User";
import {
  UserRepository,
  UserMovieRepository,
  PlatformRepository,
  MovieTagRepository,
  UserTagRepository,
  MovieRepository,
  UserAchievementRepository,
  AchievementRepository,
} from "../repositories";

export interface userDetails {
  id: string;
  name: string;
  email?: string;
  photoPath?: string;
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
  userId: string
): Promise<UserMovie[]> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const movies = await userMovieRepository.find({
    where: { userId, status },
    relations: ["movie", "movie.platforms"],
  });

  const moviesWithoutId = movies.map((movie) => {
    movie.userId = "";
    return movie;
  });

  return moviesWithoutId;
};

const setUserTags = async (idMovie: string, idUser: string): Promise<void> => {
  const userTagRepository = getCustomRepository(UserTagRepository);
  const movieTagRepository = getCustomRepository(MovieTagRepository);

  const movieTagList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .where(`movieTag.movieId = "${idMovie}"`)
    .getMany();

  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movieId = "${idMovie}"`)
    .getSql();

  const existingUserTags = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.tagId IN (${movieTagSql})`)
    .andWhere(`userTag.userId = "${idUser}"`)
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
    newUserTag.userId = idUser;
    newUserTag.totalPoint = movietag.weight;
    existingUserTags.push(newUserTag);
  });

  await userTagRepository.save(existingUserTags);
};

const setMovieStatusWatchedLiked = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<UserMovie> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movieId: idMovie, userId: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movieId = parseInt(idMovie);
    newUserMovieStatus.userId = idUser;
    newUserMovieStatus.status = status;

    const result = await userMovieRepository.save(newUserMovieStatus);

    await setUserTags(idMovie, idUser);

    return result;
  } else {
    exists.status = status;

    const result = await userMovieRepository.save(exists);

    await setUserTags(idMovie, idUser);

    return result;
  }
};

const setMovieStatusWatchedDisliked = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<UserMovie> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movieId: idMovie, userId: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movieId = parseInt(idMovie);
    newUserMovieStatus.userId = idUser;
    newUserMovieStatus.status = status;

    const result = await userMovieRepository.save(newUserMovieStatus);

    return result;
  } else {
    if (exists.status == MovieUserStatus.WATCHED_AND_LIKED)
      await decreaseUserTagPoints(exists);

    exists.status = status;

    const result = await userMovieRepository.save(exists);

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
    where: { movieId: idMovie, userId: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movieId = parseInt(idMovie);
    newUserMovieStatus.userId = idUser;
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
    .where(`movieTag.movieId = "${userMovie.movieId}"`)
    .getMany();

  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movieId = "${userMovie.movieId}"`)
    .getSql();

  const existingUserTags = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.tagId IN (${movieTagSql})`)
    .andWhere(`userTag.userId = "${userMovie.userId}"`)
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

const deleteUserMovie = async (
  idMovie: string,
  idUser: string
): Promise<UserMovie | undefined> => {
  const userMovieRepository = getCustomRepository(UserMovieRepository);

  const exists = await userMovieRepository.findOne({
    where: { movieId: idMovie, userId: idUser },
  });
  if (exists) {
    if (exists.status == MovieUserStatus.WATCHED_AND_LIKED)
      await decreaseUserTagPoints(exists);

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
    where: { movieId: idMovie, userId: idUser },
  });
  if (!exists) {
    const newUserMovieStatus = new UserMovie();
    newUserMovieStatus.movieId = parseInt(idMovie);
    newUserMovieStatus.userId = idUser;
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
  userId: string,
  tagIds: number[]
): Promise<UserTag[]> => {
  const userTagRespoitory = getRepository(UserTag);
  const userTags = tagIds.map((id) => {
    const userTag = new UserTag();
    userTag.tagId = id;
    userTag.userId = userId;
    userTag.totalPoint = 50;
    return userTag;
  });
  const insertedUserTags = await userTagRespoitory.save(userTags);
  return insertedUserTags;
};

const setAchievementProgress = async (
  movieId: string,
  userId: string
): Promise<UserAchievement | undefined> => {
  const movieTagRepository = getCustomRepository(MovieTagRepository);
  const userAchievement = getCustomRepository(UserAchievementRepository);
  const achievementRepository = getCustomRepository(AchievementRepository);
  // Faz uma query para pegar as supertags do filme
  const movieTagSql = movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.tagId", "tagId")
    .where(`movieTag.movieId = "${movieId}"`)
    .andWhere(`movieTag.super = 1`)
    .getSql();

  // Faz uma busca para pegar os achievements relacionados com as supertags
  const achievementsByMovie = await achievementRepository
    .createQueryBuilder("userAchievement")
    .where(`userAchievement.tagId IN (${movieTagSql})`)
    .getMany();

  let achievementsByMovieMap = Object.assign(
    {},
    ...achievementsByMovie.map((x) => ({ [x.id]: x }))
  );

  // Faz uma busca dos achievements que o usuário já conquistou
  const existingUserAchivements = await userAchievement
    .createQueryBuilder("userAchievement")
    .where(
      `userAchievement.achievementId IN (${Object.keys(
        achievementsByMovieMap
      )})`
    )
    .andWhere(`userAchievement.userId = "${userId}"`)
    .getMany();

  let userAchievementMap = Object.assign(
    {},
    ...existingUserAchivements.map((x) => ({ [x.achievementId]: x }))
  );

  const allAchievementsIds = new Set([
    ...Object.keys(achievementsByMovieMap),
    ...Object.keys(userAchievementMap),
  ]);

  allAchievementsIds.forEach((id) => {
    if (userAchievementMap[id]) {
      if (
        achievementsByMovieMap[id].targetScore >
        userAchievementMap[id].currentScore
      )
        userAchievementMap[id].currentScore += 1;
    } else {
      const userAchievementObj = new UserAchievement();
      userAchievementObj.achievementId = Number(id);
      userAchievementObj.currentScore = 1;
      userAchievementObj.userId = userId;
      userAchievementMap[id] = userAchievementObj;
    }
  });

  // const result = await userAchievement.save(userAchievementMap);
  //  Falta colocar tipagem para não bugar o SAVE()
  // console.log(userAchievementMap);
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
