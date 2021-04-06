import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories";

const createUserExample = async (userDetails: User): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const newUser = userRepository.create();

  Object.assign(newUser, userDetails);

  return newUser;
};

export default {
  createUserExample,
};
