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

const setMovieStatusWatched = async (
  idMovie: string,
  idUser: string,
  status: string
): Promise<void> => {
  return;
};

export default {
  createUser,
  findUserById,
  setMovieStatusWatched,
  getUserMoviesByStatus,
};
