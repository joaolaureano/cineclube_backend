"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs_1 = __importDefault(require("fs"));
const _1 = __importDefault(require("."));
const Models = __importStar(require("../models"));
const Repositories = __importStar(require("../repositories"));
const typeorm_1 = require("typeorm");
const movieData = JSON.parse(
  fs_1.default.readFileSync("src/data/cine_filmes.json", "utf-8")
);
const connect = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const connection = yield (0, _1.default)();
      console.log("Connected successfully to database.");
      // Read JSON
      const movie_ids = Object.keys(movieData);
      const tags = readMovieTags(movie_ids);
      const platforms = readMoviePlatforms(movie_ids);
      const movies = readMovies(movie_ids);
      const actors = readMovieActors(movie_ids);
      const directors = readMovieDirectors(movie_ids);
      // Get repositories
      const tagRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.TagRepository
      );
      const platformRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.PlatformRepository
      );
      const movieRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.MovieRepository
      );
      const actorRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.ActorRepository
      );
      const castRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.CastRepository
      );
      const achievementRepository = (0, typeorm_1.getCustomRepository)(
        Repositories.AchievementRepository
      );
      // Insert data
      console.log("Inserting tags...");
      const insertedTags = yield tagRepository.save(Object.values(tags));
      console.log("DONE");
      console.log("Inserting Platforms...");
      const insertedPlatforms = yield platformRepository.save(
        Object.values(platforms)
      );
      console.log("DONE");
      console.log("Inserting Movies...");
      const insertedMovies = yield movieRepository.save(Object.values(movies));
      console.log("DONE");
      console.log("Inserting actors...");
      const insertedActors = yield actorRepository.save(Object.values(actors));
      const insertedDirectors = yield actorRepository.save(
        Object.values(directors)
      );
      console.log("DONE");
      // Link tags and platforms to movies
      const tagMap = toObject("name", insertedTags);
      const platformMap = toObject("name", insertedPlatforms);
      const movieMap = toObject("title", insertedMovies);
      const movieTags = [];
      movie_ids.forEach((id) => {
        const movie = movieData[id];
        const movieModel = movieMap[movie.brazilian_title];
        const supertags = movie.supertags;
        const superTagMap = {};
        supertags.forEach((tagName) => {
          superTagMap[tagName] = tagName;
        });
        const tagList = movie.tags;
        tagList.forEach(([tagName, weight]) => {
          const tagModel = tagMap[tagName];
          const movieTagModel = new Models.MovieTag();
          movieTagModel.tag = tagModel;
          movieTagModel.movie = movieModel;
          movieTagModel.super = !!superTagMap[tagName];
          movieTagModel.weight = parseInt(weight);
          movieTags.push(movieTagModel);
        });
        const platformNames = movie.platforms;
        platformNames.forEach((platformName) => {
          const platformModel = platformMap[platformName];
          movieModel.platforms.push(platformModel);
        });
      });
      // Save changes
      console.log("Linking Platforms to Movies...");
      yield movieRepository.save(Object.values(movieMap));
      console.log("DONE");
      console.log("Linking Tags to Movies...");
      console.log("DONE");
      // Link actors to movies
      const actorMap = toObject("name", insertedActors);
      const directorsMap = toObject("name", insertedDirectors);
      const cast = [];
      movie_ids.forEach((id) => {
        const movie = movieData[id];
        const movieModel = movieMap[movie.brazilian_title];
        const actors = movie.cast;
        actors.forEach((actorName) => {
          const actorModel = actorMap[actorName];
          const castModel = new Models.Cast();
          castModel.actor = actorModel;
          castModel.movie = movieModel;
          castModel.director = false;
          cast.push(castModel);
        });
        const directors = movie.directors;
        directors.forEach((actorName) => {
          const actorModel = directorsMap[actorName];
          const castModel = new Models.Cast();
          castModel.actor = actorModel;
          castModel.movie = movieModel;
          castModel.director = true;
          cast.push(castModel);
        });
      });
      console.log("Linking Actors to Movies...");
      yield castRepository.save(Object.values(cast));
      console.log("DONE");
      //Create achievements
      const achievements = [];
      const achievementImage = "https://i.imgur.com/kuZNoUt.png";
      achievements.push({
        tagName: "Drama",
        targetScore: 5,
        path_image: achievementImage,
        title: "Que drama!",
        description: "Parabéns! Você assistiu 5 filmes de drama.",
      });
      achievements.push({
        tagName: "Drama",
        targetScore: 10,
        path_image: achievementImage,
        title: "A vida é um drama!!!!",
        description: "Incrível! Você assitiu 10 filmes de drama.",
      });
      achievements.push({
        tagName: "Mystery",
        targetScore: 3,
        path_image: achievementImage,
        title: "Cuidado, algo está acontecendo!",
        description: "Secretamente você assistiu 3 filmes de mistério.",
      });
      achievements.push({
        tagName: "Thriller",
        targetScore: 3,
        path_image: achievementImage,
        title: "Plot Twist!",
        description: "Do nada você assistiu 3 filmes tríler.",
      });
      achievements.push({
        tagName: "Comedy",
        targetScore: 3,
        path_image: achievementImage,
        title: "Respira que tem mais piada!",
        description:
          "Acalma que tem muita risada, mas parabéns pelos 3 filmes de comédia assistidos.",
      });
      achievements.push({
        tagName: "Horror",
        targetScore: 3,
        path_image: achievementImage,
        title: "Não tenha medo!",
        description:
          "O filme já acabou e acho que nada daquilo é real. Enfim, parabéns pela conquista de 3 filmes de terror assistidos.",
      });
      achievements.push({
        tagName: "Romance",
        targetScore: 3,
        path_image: achievementImage,
        title: "Awnn que amor!",
        description: "Com muito amor você assistiu 3 filmes de romance.",
      });
      //Link tags to achievements
      const achievementModels = [];
      achievements.forEach((achievement) => {
        const achievementModel = new Models.Achievement();
        achievementModel.pathImage = achievement.path_image;
        achievementModel.title = achievement.title;
        achievementModel.description = achievement.description;
        achievementModel.targetScore = achievement.targetScore;
        const tagModel = tagMap[achievement.tagName];
        achievementModel.tag = tagModel;
        achievementModels.push(achievementModel);
      });
      yield achievementRepository.save(achievementModels);
      console.log("Finished inserting data, exiting...");
      connection.close();
      process.exit();
    } catch (err) {
      const error = err;
      console.log(`Error connecting to database!\n${error.message}`);
      process.exit();
    }
  });
const readMovieTags = (movie_ids) => {
  const tags = {};
  movie_ids.forEach((id) => {
    const movie = movieData[id];
    const supertags = movie.supertags;
    supertags.forEach((superTagName) => {
      if (!tags[superTagName]) {
        const tagModel = new Models.Tag();
        tagModel.name = superTagName;
        tags[superTagName] = tagModel;
      }
    });
    const tagList = movie.tags;
    tagList.forEach(([tagName]) => {
      if (!tags[tagName]) {
        const tagModel = new Models.Tag();
        tagModel.name = tagName;
        tags[tagName] = tagModel;
      }
    });
  });
  return tags;
};
const readMoviePlatforms = (movie_ids) => {
  const platforms = {};
  movie_ids.forEach((id) => {
    const movie = movieData[id];
    const platformNames = movie.platforms;
    platformNames.forEach((platformName) => {
      if (!platforms[platformName]) {
        const platformModel = new Models.Platform();
        platformModel.name = platformName;
        platforms[platformName] = platformModel;
      }
    });
  });
  return platforms;
};
const readMovieActors = (movie_ids) => {
  const actors = {};
  movie_ids.forEach((id) => {
    const movie = movieData[id];
    const actorNames = movie.cast;
    actorNames.forEach((actorName) => {
      if (!actors[actorName]) {
        const actorModel = new Models.Actor();
        actorModel.name = actorName;
        actors[actorName] = actorModel;
      }
    });
  });
  return actors;
};
const readMovieDirectors = (movie_ids) => {
  const director = {};
  movie_ids.forEach((id) => {
    const movie = movieData[id];
    const directorNames = movie.directors;
    directorNames.forEach((directorName) => {
      if (!director[directorName]) {
        const directorModel = new Models.Actor();
        directorModel.name = directorName;
        director[directorName] = directorModel;
      }
    });
  });
  return director;
};
const readMovies = (movie_ids) => {
  const movies = {};
  movie_ids.forEach((id) => {
    const movie = movieData[id];
    const movieModel = new Models.Movie();
    movieModel.title = movie.brazilian_title;
    movieModel.original_title = movie.original_title;
    movieModel.synopsis = movie.synopsis;
    movieModel.year = movie.year;
    movieModel.curator = movie.curator;
    movieModel.critic = movie.custom_description;
    movieModel.path_banner = movie.cover_url;
    movieModel.duration = movie.runtime;
    movieModel.platforms = [];
    movies[id] = movieModel;
  });
  return movies;
};
const toObject = (keyField, arr) => {
  const obj = {};
  arr.forEach((item) => {
    obj[item[keyField]] = item;
  });
  return obj;
};
connect();
