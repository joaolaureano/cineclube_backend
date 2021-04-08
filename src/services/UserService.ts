import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories";

const createUser = async (userDetails: User) => {
  try {
    const userRepository = getCustomRepository(UserRepository);

    const result = await userRepository.insert(userDetails);

    return true;
  } catch (error) {
    throw "Could not create new user. Check database connection.";
  }
};

export default createUser;
