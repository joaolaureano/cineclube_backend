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

const getAll = async (user_id: string): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const moviesNotInUserList = movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movie.platforms", "platforms")
    .leftJoinAndSelect("movie.movie_cast", "movie_cast")
    .leftJoinAndSelect("movie_cast.actor", "actors")
    .leftJoinAndSelect("movie.moviesTags", "movieTag", "movieTag.super = true")
    .leftJoinAndSelect("movieTag.tag", "tag")
    .getMany();

  return moviesNotInUserList;
};

const getMoviesNotInUserLists = async (
  user_id: string,
  superTags?: boolean
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const userMovieList = getCustomRepository(UserMovieRepository)
    .createQueryBuilder("userMovie")
    .select("userMovie.movieId", "movieId")
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
};

const getMovieListByIds = async (
  movieIds: number[],
  superTags?: boolean
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movies = await movieRepository
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
    .where(`movie.id IN (${movieIds})`)
    .getMany();

  return movies;
};

const getRecommendedList = async (
  user_id: string,
  tags?: number[],
  platforms?: number[]
): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);
  const userTagRepository = getCustomRepository(UserTagRepository);

  // Select de todas as tags que o usuário se interessa
  const userTagList = await userTagRepository
    .createQueryBuilder("userTag")
    .where(`userTag.user_id = "${user_id}"`)
    .getMany();

  if (userTagList.length === 0) {
    let movies = await getMoviesNotInUserLists(user_id);

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
  const userMovieList = getCustomRepository(UserMovieRepository)
    .createQueryBuilder("userMovie")
    .select("userMovie.movieId", "movieId")
    .where(`userMovie.user_id = "${user_id}"`)
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
      scoreMovies[movie.id].score +=
        mapUserTagTotalPoint[movieTag.tagId] * movieTag.weight;
    });
  });

  // Busca dos filmes com todas informações necessárias junto (movie_cast, platforms, tags, etc)
  const sortedMovieIds = movies.map((movie) => movie.id);
  if (sortedMovieIds.length === 0) {
    return [];
  }
  const sortedMovieModels = await getMovieListByIds(sortedMovieIds);

  // Ordenar os filmes por score
  const sortedMovies = sortedMovieModels?.sort((movie, nextMovie) => {
    const movieScore = scoreMovies[movie.id].score;
    const nextMovieScore = scoreMovies[nextMovie.id].score;

    return nextMovieScore - movieScore;
  });

  if (sortedMovies) {
    let movies = sortedMovies;
    if (platforms) movies = filterMoviesByPlatforms(platforms, movies);
    if (tags) movies = filterMoviesByTags(tags, movies);

    const filteredMovies = movies.map((movie) => {
      movie.moviesTags = movie.moviesTags.filter((movieTag) => movieTag.super);
      return movie;
    });

    return filteredMovies;
  }
};

const filterMoviesByTags = (tags: number[], movieList: Movie[]) => {
  if (tags.length == 0) {
    return movieList;
  }

  const filteredMovies = movieList?.filter((movie) => {
    const movieFilteredTags = movie.moviesTags.find((movieTag) => {
      return tags.indexOf(movieTag.tagId) >= 0;
    });
    return movieFilteredTags;
  });

  return filteredMovies;
};

const filterMoviesByPlatforms = (platforms: number[], movieList: Movie[]) => {
  if (platforms.length == 0) {
    return movieList;
  }

  const filteredMovies = movieList?.filter((movie) => {
    const movieFilteredByPlatforms = movie.platforms.find((platform) => {
      return platforms.indexOf(platform.id) >= 0;
    });
    return movieFilteredByPlatforms;
  });

  return filteredMovies;
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
