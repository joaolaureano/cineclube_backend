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

  // Geração de lista com apenas os valores das ids de tag
  const tagIdList = userTagList.map((userTag: { tagId: any }) => userTag.tagId);

  //Select de todos os IDS de filmes que possuem alguma tag gerada na query acima
  const movieTagIdList = await movieTagRepository
    .createQueryBuilder("movieTag")
    .select("movieTag.movieId", "movieId")
    .addSelect("movieTag.tagId", "tagId")
    .where(`movieTag.tagId in (${tagIdList})`)
    .execute();

  // Geração de lista com apenas os valores das ids de filme
  const movieIdList = movieTagIdList.map(
    (movie: { movieId: any }) => movie.movieId
  );

  //Select de todos os filmes que estao na lista acima
  const movies = await movieRepository
    .createQueryBuilder("movie")
    .select("movie")
    .where(`movie.id in (${movieIdList})`)
    .execute();

  //Mapeamento de pontuação da tag para a id da tag
  const mapUserTagTotalPoint = Object();
  userTagList.map((tagId: { tagId: string | number; totalPoint: any }) => {
    mapUserTagTotalPoint[tagId.tagId] = tagId.totalPoint;
  });

  // Mapeamento de filme para id do filme
  const mapMovie = Object();
  movies.map((movie: any) => {
    mapMovie[movie.movie_id] = movie;
  });

  // Inicialização de score em 0 e dos filmes
  let scoreMovies: MapMovieScore = {};
  movieIdList.forEach((movie: number) => {
    scoreMovies[movie] = {} as MovieScore;
    scoreMovies[movie].score = 0;
    scoreMovies[movie].movie = mapMovie[movie];
  });

  // Cálculo do score para determinado filme
  movieTagIdList.forEach((relacao: any) => {
    scoreMovies[relacao.movieId].score += mapUserTagTotalPoint[relacao.tagId];
  });

  const arrMovieScore = Object.values(scoreMovies);

  return arrMovieScore.sort((a: any, b: any) => (a.score > b.score ? -1 : 1));
};
const getById = async (id: number) => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movie = await movieRepository.findOne(id);

  return movie;
};
interface MapMovieScore {
  [movieId: number]: MovieScore;
}
interface MovieScore {
  movie: Movie;
  score: Number;
}

export default { getById, getRecommendedList };
