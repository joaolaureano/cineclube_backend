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
  const moveIdList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.movieId", "movieId")
    .where(`movieTag.tagId in (${tagIdList})`)
    .execute();
  console.log(moveIdList);

  return undefined;
};
const getById = async (id: number) => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movie = await movieRepository.findOne(id);

  return movie;
};

export default { getAll, getById, getRecommendedList };
