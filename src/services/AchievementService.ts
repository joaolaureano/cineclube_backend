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

const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  const achievementRepository = getCustomRepository(AchievementRepository);

  const achievements = await achievementRepository
    .createQueryBuilder("achievement")
    .innerJoin(
      "achievement.users",
      "users",
      `users.userId = "${userId}" AND users.currentScore = achievement.targetScore`
    )
    .getMany();

  return achievements;
};

export default {
  getAll,
  getUserAchievements,
};
