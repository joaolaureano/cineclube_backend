import "reflect-metadata";
import fs from "fs";

import connectDatabase from ".";

import * as Models from "../models";
import * as Repositories from "../repositories";
import { getCustomRepository } from "typeorm";

const movieData = JSON.parse(
  fs.readFileSync("src/data/cine_filmes.json", "utf-8")
);

const connect = async () => {
  try {
    const connection = await connectDatabase();
    console.log("Connected successfully to database.");

    // Read JSON
    const movieIds = Object.keys(movieData);
    const tags = readMovieTags(movieIds);
    const platforms = readMoviePlatforms(movieIds);
    const movies = readMovies(movieIds);

    // Get repositories
    const tagRepository = getCustomRepository(Repositories.TagRepository);
    const platformRepository = getCustomRepository(
      Repositories.PlatformRepository
    );
    const movieRepository = getCustomRepository(Repositories.MovieRepository);
    const movieTagRepository = getCustomRepository(
      Repositories.MovieTagRepository
    );

    // Insert data
    console.log("Inserting tags...");
    const insertedTags = await tagRepository.save(Object.values(tags));
    console.log("DONE");
    console.log("Inserting Platforms...");
    const insertedPlatforms = await platformRepository.save(
      Object.values(platforms)
    );
    console.log("DONE");
    console.log("Inserting Movies...");
    const insertedMovies = await movieRepository.save(Object.values(movies));
    console.log("DONE");

    // Link tags and platforms to movies
    const tagMap = toObject("name", insertedTags);
    const platformMap = toObject("name", insertedPlatforms);
    const movieMap = toObject("title", insertedMovies);

    const movieTags: Models.MovieTag[] = [];

    movieIds.forEach((id: string) => {
      const movie = movieData[id];
      const movieModel = movieMap[movie.brazilian_title];

      const supertags: string[] = movie.supertags;
      supertags.forEach((tagName) => {
        const tagModel = tagMap[tagName];

        const movieTagModel = new Models.MovieTag();
        movieTagModel.tag = tagModel;
        movieTagModel.movie = movieModel;
        movieTagModel.super = true;
        movieTagModel.weight = 2;
        movieTags.push(movieTagModel);
      });

      const platformNames: string[] = movie.platforms;
      platformNames.forEach((platformName) => {
        const platformModel = platformMap[platformName];
        movieModel.platforms.push(platformModel);
      });
    });

    // Save changes
    console.log("Linking Platforms to Movies...");
    await movieRepository.save(Object.values(movieMap));
    console.log("DONE");
    console.log("Linking Tags to Movies...");
    const insertedMovieTags = await movieTagRepository.save(movieTags);
    console.log("DONE");

    // Print inserted data
    // console.log({tags: insertedTags, platforms: insertedPlatforms, movies: insertedMovies, movieTags: insertedMovieTags});

    console.log("Finished inserting data, exiting...");
    connection.close();
    process.exit();
  } catch (err) {
    console.log(`Error connecting to database!\n${err.message}`);
    process.exit();
  }
};

const readMovieTags = (movieIds: string[]) => {
  const tags: { [tagName: string]: Models.Tag } = {};

  movieIds.forEach((id: string) => {
    const movie = movieData[id];

    const supertags: string[] = movie.supertags;
    supertags.forEach((tagName) => {
      if (!tags[tagName]) {
        const tagModel = new Models.Tag();
        tagModel.name = tagName;
        tags[tagName] = tagModel;
      }
    });
  });
  return tags;
};

const readMoviePlatforms = (movieIds: string[]) => {
  const platforms: { [platformName: string]: Models.Platform } = {};

  movieIds.forEach((id: string) => {
    const movie = movieData[id];

    const platformNames: string[] = movie.platforms;
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

const readMovies = (movieIds: string[]) => {
  const movies: { [movieId: string]: Models.Movie } = {};

  movieIds.forEach((id: string) => {
    const movie = movieData[id];

    const movieModel = new Models.Movie();
    movieModel.title = movie.brazilian_title;
    movieModel.originalTitle = movie.original_title;
    movieModel.synopsis = movie.synopsis;
    movieModel.year = movie.year;
    movieModel.curator = movie.curator;
    movieModel.critic = movie.custom_description;
    movieModel.pathBanner = movie.cover_url;
    movieModel.platforms = [];
    movies[id] = movieModel;
  });
  return movies;
};

const toObject = (keyField: string, arr: Array<any>) => {
  const obj: { [key: string]: any } = {};
  arr.forEach((item) => {
    obj[item[keyField]] = item;
  });
  return obj;
};

connect();
