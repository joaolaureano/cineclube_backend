import { getCustomRepository } from "typeorm";
import { UserMovie } from "../models";
import { User } from "../models/User";
import { UserRepository, UserMovieRepository } from "../repositories";

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
    relations: ["movie"],
  });

  const moviesWithoutId = movies.map((movie) => {
    movie.userId = "";
    return movie;
  });

  return moviesWithoutId;
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

    return result;
  } else {
    exists.status = status;

    const result = await userMovieRepository.save(exists);

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

export default {
  createUser,
  findUserById,
  setMovieStatusWatchedLiked,
  setMovieStatusWatchedDisliked,
  getUserMoviesByStatus,
  setMovieStatusDontWantWatch,
  setMovieStatusWantToWatch,
};
