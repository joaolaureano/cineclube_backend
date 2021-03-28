import { getCustomRepository } from "typeorm";
import { User } from "../models/User";

import { UserRepository } from "../repositories";

export type UserCreationDetails = {
  email: string;
};

const createUserExample = async (
  userDetails: UserCreationDetails
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const newUser = userRepository.create();

  //Validate fields

  Object.assign(newUser, userDetails);

  // await userRepository.save(newUser);

  return newUser;
};

export default {
  createUserExample,
};
