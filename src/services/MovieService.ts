import { SourceMap } from "module";
import { Any, getCustomRepository } from "typeorm";
import { Movie } from "../models/Movie";
import {
  MovieRepository,
  MovieTagRepository,
  UserMovieRepository,
} from "../repositories";
import { UserTagRepository } from "../repositories/UserTagRepository";

export interface userDetails {
  id: string;
  name: string;
  email?: string;
  photoPath?: string;
}

const getAll = async (userId: string): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const moviesNotInUserList = movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movie.platforms", "platforms")
    .leftJoinAndSelect("movie.cast", "cast")
    .leftJoinAndSelect("cast.actor", "actors")
    .leftJoinAndSelect("movie.moviesTags", "movieTag", "movieTag.super = true")
    .leftJoinAndSelect("movieTag.tag", "tag")
    .getMany();

  return moviesNotInUserList;
};

const getMoviesNotInUserLists = async (
  userId: string
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const userMovieList = getCustomRepository(UserMovieRepository)
    .createQueryBuilder("userMovie")
    .select("userMovie.movieId", "movieId")
    .where(`userMovie.userId = "${userId}"`)
    .getSql();

  const moviesNotInUserList = movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movie.platforms", "platforms")
    .leftJoinAndSelect("movie.cast", "cast")
    .leftJoinAndSelect("cast.actor", "actors")
    .leftJoinAndSelect("movie.moviesTags", "movieTag", "movieTag.super = true")
    .leftJoinAndSelect("movieTag.tag", "tag")
    .where(`movie.id NOT IN (${userMovieList})`)
    .getMany();

  return moviesNotInUserList;
};

const getMovieListByIds = async (
  movieIds: number[]
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movies = await movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movie.platforms", "platforms")
    .leftJoinAndSelect("movie.cast", "cast")
    .leftJoinAndSelect("cast.actor", "actors")
    .leftJoinAndSelect("movie.moviesTags", "movieTag", "movieTag.super = true")
    .leftJoinAndSelect("movieTag.tag", "tag")
    .where(`movie.id IN (${movieIds})`)
    .getMany();

  return movies;
};

const getRecommendedList = async (
  userId: string
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);
  const userTagRepository = getCustomRepository(UserTagRepository);

  // Select de todas as tags que o usuário se interessa
  const userTagList = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.userId = "${userId}"`)
    .getMany();

  if (userTagList.length === 0) return getMoviesNotInUserLists(userId);

  // Geração de lista com apenas os valores das ids de tag
  const tagIdList = userTagRepository
    .createQueryBuilder("userTag")
    .select("userTag.tagId", "tagId")
    .where(`userTag.userId = "${userId}"`)
    .getSql();

  //Select com os ids de filmes em listas do usuário
  const userMovieList = getCustomRepository(UserMovieRepository)
    .createQueryBuilder("userMovie")
    .select("userMovie.movieId", "movieId")
    .where(`userMovie.userId = "${userId}"`)
    .getSql();

  //Select de todos os filmes que possuem alguma tag gerada na query acima
  const movies = await movieRepository
    .createQueryBuilder("movie")
    .innerJoinAndSelect("movie.moviesTags", "movieTag")
    .where(
      `movieTag.tagId in (${tagIdList}) AND movieTag.movieId NOT IN (${userMovieList})`
    )
    .getMany();

  //Mapeamento de pontuação da tag para a id da tag
  const mapUserTagTotalPoint: { [tagId: number]: number } = {};
  userTagList.map((tagId) => {
    mapUserTagTotalPoint[tagId.tagId] = tagId.totalPoint;
  });

  const scoreMovies: { [movieId: number]: MovieScore } = {};

  // Inicialização de score em 0 e dos filmes e
  // cálculo do score para determinado filme
  movies.forEach((movie) => {
    scoreMovies[movie.id] = {
      score: 0,
      movie,
    };
    movie.moviesTags.forEach((movieTag) => {
      scoreMovies[movie.id].score += mapUserTagTotalPoint[movieTag.tagId];
    });
  });

  // Busca dos filmes com todas informações necessárias junto (cast, platforms, tags, etc)
  const sortedMovieIds = movies.map((movie) => movie.id);
  const sortedMovieModels = await getMovieListByIds(sortedMovieIds);

  // Ordenar os filmes por score
  const sortedMovies = sortedMovieModels?.sort((movie, nextMovie) => {
    const movieScore = scoreMovies[movie.id].score;
    const nextMovieScore = scoreMovies[nextMovie.id].score;
    console.log(`${movie.id} -- ${nextMovie.id}`);

    return nextMovieScore - movieScore;
  });

  return sortedMovies;
};

const getById = async (id: number) => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movie = await movieRepository.findOne(id);

  return movie;
};

interface MovieScore {
  movie: Movie;
  score: number;
}

export default { getById, getRecommendedList };
