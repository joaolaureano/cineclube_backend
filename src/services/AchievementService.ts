import { getCustomRepository } from "typeorm";
import { Achievement } from "../models";
import { AchievementRepository } from "../repositories";

const getAll = async (): Promise<Achievement[]> => {
  const achievementRepository = getCustomRepository(AchievementRepository);

  const achievements = await achievementRepository.find({
    relations: ["tag"],
  });

  return achievements;
};

export default {
  getAll,
};
