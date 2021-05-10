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

const getRecommendedList = async (
  userId: string
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);
  const userTagRepository = getCustomRepository(UserTagRepository);
  const movieTagRepository = getCustomRepository(MovieTagRepository);

  // Select de todas as tags que o usuário se interessa
  const userTagList = await userTagRepository
    .createQueryBuilder("userTag")
    .select("userTag.totalPoint", "totalPoint")
    .addSelect("userTag.tagId", "tagId")
    .where(`userTag.userId = "${userId}"`)
    .execute();

  const tagIdList = userTagList.map((userTag: { tagId: any }) => userTag.tagId);

  // let result = objArray.map(a => a.foo);
  //Select de todos os IDS de filmes que possuem alguma tag gerada na query acima
  const movieTagIdList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.movieId", "movieId")
    .addSelect("movieTag.tagId", "tagId")
    .where(`movieTag.tagId in (${tagIdList})`)
    .execute();

  const movieIdList = movieTagIdList.map(
    (movie: { movieId: any }) => movie.movieId
  );

  //Select de todos os filmes que estao na lista acima
  const movies = await movieRepository
    .createQueryBuilder("movie")
    .select("movie")
    .where(`movie.id in (${movieIdList})`)
    .execute();

  const scoreMovies = Object();
  const mapUserTagTotalPoint = Object();
  userTagList.map((tagId: { tagId: string | number; totalPoint: any }) => {
    mapUserTagTotalPoint[tagId.tagId] = tagId.totalPoint;
  });

  movieIdList.forEach((movie: number) => {
    scoreMovies[movie] = {} as MovieScore;
    scoreMovies[movie].score = 0;
  });

  movieTagIdList.forEach((relacao: any) => {
    scoreMovies[relacao.movieId].score += mapUserTagTotalPoint[relacao.tagId];
  });

  movieTagIdList.forEach((element) => {
    scoreMovies[relacao.movieId].score += mapUserTagTotalPoint[relacao.tagId];
  });

  return undefined;
};
const getById = async (id: number) => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movie = await movieRepository.findOne(id);

  return movie;
};
interface MovieScore {
  movie: Movie;
  score: Number;
}

export default { getAll, getById, getRecommendedList };
