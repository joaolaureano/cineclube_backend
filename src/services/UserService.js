"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const MovieUserStatus_1 = require("../enum/MovieUserStatus");
const models_1 = require("../models");
const User_1 = require("../models/User");
const repositories_1 = require("../repositories");
const createUser = (userDetails) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserRepository
    );
    const newUser = new User_1.User();
    Object.assign(newUser, userDetails);
    newUser.randomness = 0;
    const result = yield userRepository.save(newUser);
    return result;
  });
const findUserById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserRepository
    );
    const user = yield userRepository.findOne(id);
    return user;
  });
const getUserMoviesByStatus = (status, user_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const movies = yield userMovieRepository.find({
      where: { user_id, status },
      relations: ["movie", "movie.platforms"],
    });
    const moviesWithoutId = movies.map((movie) => {
      movie.user_id = "";
      return movie;
    });
    return moviesWithoutId;
  });
const setUserTags = (idMovie, idUser) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserTagRepository
    );
    const movieTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieTagRepository
    );
    const movieTagList = yield movieTagRepository
      .createQueryBuilder("movieTag")
      .where(`movieTag.movie_id = "${idMovie}"`)
      .getMany();
    const movieTagSql = movieTagRepository
      .createQueryBuilder("movieTag")
      .select("movieTag.tagId", "tagId")
      .where(`movieTag.movie_id = "${idMovie}"`)
      .getSql();
    const existingUserTags = yield userTagRepository
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
      const newUserTag = new models_1.UserTag();
      newUserTag.tagId = movietag.tagId;
      newUserTag.user_id = idUser;
      newUserTag.totalPoint = movietag.weight;
      existingUserTags.push(newUserTag);
    });
    yield userTagRepository.save(existingUserTags);
  });
const setMovieStatusWatchedLiked = (idMovie, idUser, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const exists = yield userMovieRepository.findOne({
      where: { movie_id: idMovie, user_id: idUser },
    });
    if (!exists) {
      const newUserMovieStatus = new models_1.UserMovie();
      newUserMovieStatus.movie_id = parseInt(idMovie);
      newUserMovieStatus.user_id = idUser;
      newUserMovieStatus.status = status;
      yield userMovieRepository.save(newUserMovieStatus);
      yield setUserTags(idMovie, idUser);
      const result = yield setAchievementProgress(idMovie, idUser);
      return result;
    } else {
      exists.status = status;
      yield userMovieRepository.save(exists);
      yield setUserTags(idMovie, idUser);
      const result = yield setAchievementProgress(idMovie, idUser);
      return result;
    }
  });
const setMovieStatusWatchedDisliked = (idMovie, idUser, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const exists = yield userMovieRepository.findOne({
      where: { movie_id: idMovie, user_id: idUser },
    });
    if (!exists) {
      const newUserMovieStatus = new models_1.UserMovie();
      newUserMovieStatus.movie_id = parseInt(idMovie);
      newUserMovieStatus.user_id = idUser;
      newUserMovieStatus.status = status;
      yield userMovieRepository.save(newUserMovieStatus);
      const result = yield setAchievementProgress(idMovie, idUser);
      return result;
    } else {
      if (exists.status == MovieUserStatus_1.MovieUserStatus.WATCHED_AND_LIKED)
        yield decreaseUserTagPoints(exists);
      exists.status = status;
      yield userMovieRepository.save(exists);
      const result = yield setAchievementProgress(idMovie, idUser);
      return result;
    }
  });
const setMovieStatusDontWantWatch = (idMovie, idUser, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const exists = yield userMovieRepository.findOne({
      where: { movie_id: idMovie, user_id: idUser },
    });
    if (!exists) {
      const newUserMovieStatus = new models_1.UserMovie();
      newUserMovieStatus.movie_id = parseInt(idMovie);
      newUserMovieStatus.user_id = idUser;
      newUserMovieStatus.status = status;
      const result = yield userMovieRepository.save(newUserMovieStatus);
      return result;
    } else {
      exists.status = status;
      const result = yield userMovieRepository.save(exists);
      return result;
    }
  });
const decreaseUserTagPoints = (userMovie) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserTagRepository
    );
    const movieTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieTagRepository
    );
    const movieTagList = yield movieTagRepository
      .createQueryBuilder("movieTag")
      .where(`movieTag.movie_id = "${userMovie.movie_id}"`)
      .getMany();
    const movieTagSql = movieTagRepository
      .createQueryBuilder("movieTag")
      .select("movieTag.tagId", "tagId")
      .where(`movieTag.movie_id = "${userMovie.movie_id}"`)
      .getSql();
    const existingUserTags = yield userTagRepository
      .createQueryBuilder("userTag")
      .where(`userTag.tagId IN (${movieTagSql})`)
      .andWhere(`userTag.user_id = "${userMovie.user_id}"`)
      .getMany();
    const removeList = [];
    const updateList = [];
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
    yield userTagRepository.save(updateList);
    yield userTagRepository.remove(removeList);
  });
const decreaseUserAchievementsPoint = (user_id, movie_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieTagRepository
    );
    const userAchievementRepo = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserAchievementRepository
    );
    const achievementRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.AchievementRepository
    );
    // Faz uma query para pegar as tags do filme
    const movieTagSql = movieTagRepository
      .createQueryBuilder("movieTag")
      .select("movieTag.tagId", "tagId")
      .where(`movieTag.movie_id = "${movie_id}"`)
      .getSql();
    // Faz uma busca para pegar os achievements relacionados com as tags
    const achievementsByMovie = yield achievementRepository
      .createQueryBuilder("userAchievement")
      .where(`userAchievement.tagId IN (${movieTagSql})`)
      .getMany();
    const achievementsByMovieMap = Object.assign(
      {},
      ...achievementsByMovie.map((x) => ({ [x.id]: x }))
    );
    // Faz uma busca dos achievements que o usuário já conquistou
    const existingUserAchivements = yield userAchievementRepo
      .createQueryBuilder("userAchievement")
      .where(
        `userAchievement.achievementId IN (${Object.keys(
          achievementsByMovieMap
        )})`
      )
      .andWhere(`userAchievement.user_id = "${user_id}"`)
      .getMany();
    const toRemoveAchievement = [];
    const toReduceAchievement = [];
    existingUserAchivements.forEach((userAchievement) => {
      userAchievement.currentScore -= 1;
      if (userAchievement.currentScore === 0)
        toRemoveAchievement.push(userAchievement);
      else toReduceAchievement.push(userAchievement);
    });
    yield userAchievementRepo.save(toReduceAchievement);
    yield userAchievementRepo.remove(toRemoveAchievement);
  });
const deleteUserMovie = (idMovie, idUser) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const exists = yield userMovieRepository.findOne({
      where: { movie_id: idMovie, user_id: idUser },
    });
    if (exists) {
      if (
        exists.status == MovieUserStatus_1.MovieUserStatus.WATCHED_AND_LIKED ||
        exists.status == MovieUserStatus_1.MovieUserStatus.WATCHED_AND_DISLIKED
      ) {
        if (
          exists.status == MovieUserStatus_1.MovieUserStatus.WATCHED_AND_LIKED
        )
          yield decreaseUserTagPoints(exists);
        yield decreaseUserAchievementsPoint(idUser, idMovie);
      }
      const removed = yield userMovieRepository.remove(exists);
      return removed;
    }
  });
const setMovieStatusWantToWatch = (idMovie, idUser, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userMovieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    );
    const exists = yield userMovieRepository.findOne({
      where: { movie_id: idMovie, user_id: idUser },
    });
    if (!exists) {
      const newUserMovieStatus = new models_1.UserMovie();
      newUserMovieStatus.movie_id = parseInt(idMovie);
      newUserMovieStatus.user_id = idUser;
      newUserMovieStatus.status = status;
      const result = yield userMovieRepository.save(newUserMovieStatus);
      return result;
    } else {
      exists.status = status;
      const result = yield userMovieRepository.save(exists);
      return result;
    }
  });
const setSignUpPreferences = (user_id, tagIds) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userTagRespoitory = (0, typeorm_1.getRepository)(models_1.UserTag);
    const userTags = tagIds.map((id) => {
      const userTag = new models_1.UserTag();
      userTag.tagId = id;
      userTag.user_id = user_id;
      userTag.totalPoint = 50;
      return userTag;
    });
    const insertedUserTags = yield userTagRespoitory.save(userTags);
    return insertedUserTags;
  });
const setAchievementProgress = (movie_id, user_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieTagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieTagRepository
    );
    const userAchievementRepo = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserAchievementRepository
    );
    const achievementRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.AchievementRepository
    );
    // Faz uma query para pegar as tags do filme
    const movieTagSql = movieTagRepository
      .createQueryBuilder("movieTag")
      .select("movieTag.tagId", "tagId")
      .where(`movieTag.movie_id = "${movie_id}"`)
      .getSql();
    // Faz uma busca para pegar os achievements relacionados com as tags
    const achievementsByMovie = yield achievementRepository
      .createQueryBuilder("userAchievement")
      .where(`userAchievement.tagId IN (${movieTagSql})`)
      .getMany();
    const achievementsByMovieMap = Object.assign(
      {},
      ...achievementsByMovie.map((x) => ({ [x.id]: x }))
    );
    // Faz uma busca dos achievements que o usuário já conquistou
    const existingUserAchivements = yield userAchievementRepo
      .createQueryBuilder("userAchievement")
      .where(
        `userAchievement.achievementId IN (${Object.keys(
          achievementsByMovieMap
        )})`
      )
      .andWhere(`userAchievement.user_id = "${user_id}"`)
      .getMany();
    const userAchievementMap = Object.assign(
      {},
      ...existingUserAchivements.map((x) => ({ [x.achievementId]: x }))
    );
    const allAchievementsIds = new Set([
      ...Object.keys(achievementsByMovieMap),
      ...Object.keys(userAchievementMap),
    ]);
    const retAchievementIds = [];
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
        const userAchievementObj = new models_1.UserAchievement();
        userAchievementObj.achievementId = Number(id);
        userAchievementObj.currentScore = 1;
        userAchievementObj.user_id = user_id;
        userAchievementMap[id] = userAchievementObj;
      }
    });
    yield userAchievementRepo.save(Object.values(userAchievementMap));
    //se existir algum achievement para retornar
    if (retAchievementIds.length !== 0) {
      const achievementsById = yield achievementRepository
        .createQueryBuilder("achievements")
        .where(`achievements.id IN (${retAchievementIds})`)
        .getMany();
      return achievementsById;
    }
    return undefined;
  });
exports.default = {
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
