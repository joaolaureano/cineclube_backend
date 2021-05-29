import { MigrationInterface, QueryRunner } from "typeorm";

export class addAchievements1622315074655 implements MigrationInterface {
  name = "addAchievements1622315074655";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `achievement_tag` (`achievementId` int NOT NULL, `tagId` int NOT NULL, `totalPoint` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`achievementId`, `tagId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `user_achievement` (`userId` varchar(255) NOT NULL, `achievementId` int NOT NULL, `currentScore` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `achievementId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `achievement` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `pathImage` varchar(255) NOT NULL, `targetScore` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `achievement_tag` ADD CONSTRAINT `FK_83f13d7f8d922835043d5a51971` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_achievement` ADD CONSTRAINT `FK_2a418515c335cab7c5ba70c28b3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_achievement` ADD CONSTRAINT `FK_843ecd1965f1aac694875674a18` FOREIGN KEY (`achievementId`) REFERENCES `achievement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user_achievement` DROP FOREIGN KEY `FK_843ecd1965f1aac694875674a18`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_achievement` DROP FOREIGN KEY `FK_2a418515c335cab7c5ba70c28b3`"
    );
    await queryRunner.query(
      "ALTER TABLE `achievement_tag` DROP FOREIGN KEY `FK_83f13d7f8d922835043d5a51971`"
    );
    await queryRunner.query("DROP TABLE `achievement`");
    await queryRunner.query("DROP TABLE `user_achievement`");
    await queryRunner.query("DROP TABLE `achievement_tag`");
  }
}
