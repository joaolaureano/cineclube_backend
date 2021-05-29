import { EntityRepository, Repository } from "typeorm";

import { AchievementTag } from "../models";

@EntityRepository(AchievementTag)
export class AchievementTagRepository extends Repository<AchievementTag> {}
