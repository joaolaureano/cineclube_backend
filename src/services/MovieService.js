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
const repositories_1 = require("../repositories");
const UserTagRepository_1 = require("../repositories/UserTagRepository");
const getAll = (user_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieRepository
    );
    const moviesNotInUserList = movieRepository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.platforms", "platforms")
      .leftJoinAndSelect("movie.movie_cast", "movie_cast")
      .leftJoinAndSelect("movie_cast.actor", "actors")
      .leftJoinAndSelect(
        "movie.moviesTags",
        "movieTag",
        "movieTag.super = true"
      )
      .leftJoinAndSelect("movieTag.tag", "tag")
      .getMany();
    return moviesNotInUserList;
  });
const getMoviesNotInUserLists = (user_id, superTags) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieRepository
    );
    const userMovieList = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    )
      .createQueryBuilder("userMovie")
      .select("userMovie.movie_id", "movie_id")
      .where(`userMovie.user_id = "${user_id}"`)
      .getSql();
    const moviesNotInUserList = movieRepository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.platforms", "platforms")
      .leftJoinAndSelect("movie.movie_cast", "movie_cast")
      .leftJoinAndSelect("movie_cast.actor", "actors")
      .leftJoinAndSelect(
        "movie.moviesTags",
        "movieTag",
        superTags ? "movieTag.super = true" : ""
      )
      .leftJoinAndSelect("movieTag.tag", "tag")
      .where(`movie.id NOT IN (${userMovieList})`)
      .getMany();
    return moviesNotInUserList;
  });
const getMovieListByIds = (movie_ids, superTags) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieRepository
    );
    const movies = yield movieRepository
      .createQueryBuilder("movie")
      .leftJoinAndSelect("movie.platforms", "platforms")
      .leftJoinAndSelect("movie.movie_cast", "movie_cast")
      .leftJoinAndSelect("movie_cast.actor", "actors")
      .leftJoinAndSelect(
        "movie.moviesTags",
        "movieTag",
        superTags ? "movieTag.super = true" : ""
      )
      .leftJoinAndSelect("movieTag.tag", "tag")
      .where(`movie.id IN (${movie_ids})`)
      .getMany();
    return movies;
  });
const getRecommendedList = (user_id, tags, platforms) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieRepository
    );
    const userTagRepository = (0, typeorm_1.getCustomRepository)(
      UserTagRepository_1.UserTagRepository
    );
    // Select de todas as tags que o usuário se interessa
    const userTagList = yield userTagRepository
      .createQueryBuilder("userTag")
      .where(`userTag.user_id = "${user_id}"`)
      .getMany();
    if (userTagList.length === 0) {
      let movies = yield getMoviesNotInUserLists(user_id);
      if (movies) {
        if (platforms) movies = filterMoviesByPlatforms(platforms, movies);
        if (tags) movies = filterMoviesByTags(tags, movies);
        const filteredMovies = movies.map((movie) => {
          movie.moviesTags = movie.moviesTags.filter(
            (movieTag) => movieTag.super
          );
          return movie;
        });
        return filteredMovies;
      }
      return getMoviesNotInUserLists(user_id, true);
    }
    // Geração de lista com apenas os valores das ids de tag
    const tagIdList = userTagRepository
      .createQueryBuilder("userTag")
      .select("userTag.tagId", "tagId")
      .where(`userTag.user_id = "${user_id}"`)
      .getSql();
    //Select com os ids de filmes em listas do usuário
    const userMovieList = (0, typeorm_1.getCustomRepository)(
      repositories_1.UserMovieRepository
    )
      .createQueryBuilder("userMovie")
      .select("userMovie.movie_id", "movie_id")
      .where(`userMovie.user_id = "${user_id}"`)
      .getSql();
    //Select de todos os filmes que possuem alguma tag gerada na query acima
    const movies = yield movieRepository
      .createQueryBuilder("movie")
      .innerJoinAndSelect("movie.moviesTags", "movieTag")
      .where(
        `movieTag.tagId in (${tagIdList}) AND movieTag.movie_id NOT IN (${userMovieList})`
      )
      .getMany();
    //Mapeamento de pontuação da tag para a id da tag
    const mapUserTagTotalPoint = {};
    userTagList.map((tagId) => {
      mapUserTagTotalPoint[tagId.tagId] = tagId.totalPoint;
    });
    const scoreMovies = {};
    // Inicialização de score em 0 e dos filmes e
    // cálculo do score para determinado filme
    movies.forEach((movie) => {
      scoreMovies[movie.id] = {
        score: 0,
        movie,
      };
      movie.moviesTags.forEach((movieTag) => {
        scoreMovies[movie.id].score +=
          mapUserTagTotalPoint[movieTag.tagId] * movieTag.weight;
      });
    });
    // Busca dos filmes com todas informações necessárias junto (movie_cast, platforms, tags, etc)
    const sortedmovie_ids = movies.map((movie) => movie.id);
    if (sortedmovie_ids.length === 0) {
      return [];
    }
    const sortedMovieModels = yield getMovieListByIds(sortedmovie_ids);
    // Ordenar os filmes por score
    const sortedMovies =
      sortedMovieModels === null || sortedMovieModels === void 0
        ? void 0
        : sortedMovieModels.sort((movie, nextMovie) => {
            const movieScore = scoreMovies[movie.id].score;
            const nextMovieScore = scoreMovies[nextMovie.id].score;
            return nextMovieScore - movieScore;
          });
    if (sortedMovies) {
      let movies = sortedMovies;
      if (platforms) movies = filterMoviesByPlatforms(platforms, movies);
      if (tags) movies = filterMoviesByTags(tags, movies);
      const filteredMovies = movies.map((movie) => {
        movie.moviesTags = movie.moviesTags.filter(
          (movieTag) => movieTag.super
        );
        return movie;
      });
      return filteredMovies;
    }
  });
const filterMoviesByTags = (tags, movieList) => {
  if (tags.length == 0) {
    return movieList;
  }
  const filteredMovies =
    movieList === null || movieList === void 0
      ? void 0
      : movieList.filter((movie) => {
          const movieFilteredTags = movie.moviesTags.find((movieTag) => {
            return tags.indexOf(movieTag.tagId) >= 0;
          });
          return movieFilteredTags;
        });
  return filteredMovies;
};
const filterMoviesByPlatforms = (platforms, movieList) => {
  if (platforms.length == 0) {
    return movieList;
  }
  const filteredMovies =
    movieList === null || movieList === void 0
      ? void 0
      : movieList.filter((movie) => {
          const movieFilteredByPlatforms = movie.platforms.find((platform) => {
            return platforms.indexOf(platform.id) >= 0;
          });
          return movieFilteredByPlatforms;
        });
  return filteredMovies;
};
const getById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const movieRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.MovieRepository
    );
    const movie = yield movieRepository.findOne(id);
    return movie;
  });
exports.default = { getById, getRecommendedList };
