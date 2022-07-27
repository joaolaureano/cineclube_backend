import { MigrationInterface, QueryRunner } from "typeorm";

export class addAchievements1622319034177 implements MigrationInterface {
  name = "addAchievements1622319034177";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE appUser_achievement (userId varchar NOT NULL, achievementId int NOT NULL, currentScore int NOT NULL, created_At timestamp NOT NULL DEFAULT NOW(), updated_At timestamp NOT NULL DEFAULT NOW() , PRIMARY KEY (userId, achievementId))"
    );
    await queryRunner.query(
      "CREATE TABLE achievement (id serial, title varchar NOT NULL, description varchar NOT NULL, pathImage varchar NOT NULL, targetScore int NOT NULL, created_At timestamp NOT NULL DEFAULT NOW(), updated_At timestamp NOT NULL DEFAULT NOW() , tagId int NULL, PRIMARY KEY (id))"
    );
    await queryRunner.query(
      "ALTER TABLE appUser_achievement ADD CONSTRAINT FK_2a418515c335cab7c5ba70c28b3 FOREIGN KEY (userId) REFERENCES app_user(id) "
    );
    await queryRunner.query(
      "ALTER TABLE appUser_achievement ADD CONSTRAINT FK_843ecd1965f1aac694875674a18 FOREIGN KEY (achievementId) REFERENCES achievement(id) "
    );
    await queryRunner.query(
      "ALTER TABLE achievement ADD CONSTRAINT FK_7efd7420481a4d3cc3ee6649223 FOREIGN KEY (tagId) REFERENCES tag(id) "
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE achievement DROP FOREIGN KEY FK_7efd7420481a4d3cc3ee6649223"
    );
    await queryRunner.query(
      "ALTER TABLE appUser_achievement DROP FOREIGN KEY FK_843ecd1965f1aac694875674a18"
    );
    await queryRunner.query(
      "ALTER TABLE appUser_achievement DROP FOREIGN KEY FK_2a418515c335cab7c5ba70c28b3"
    );
    await queryRunner.query("DROP TABLE achievement");
    await queryRunner.query("DROP TABLE appUser_achievement");
  }
}
