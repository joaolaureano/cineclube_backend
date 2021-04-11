import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1618180122463 implements MigrationInterface {
  name = "createTables1618180122463";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `photoPath` varchar(255) NOT NULL, `randomness` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `originalTitle` varchar(255) NOT NULL, `synopsis` text NOT NULL, `critic` text NOT NULL, `curator` varchar(255) NOT NULL, `year` char(4) NOT NULL, `pathBanner` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `platform` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `watched` (`userId` varchar(255) NOT NULL, `movieId` int NOT NULL, `liked` tinyint NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_tag` (`tagId` int NOT NULL, `movieId` int NOT NULL, `super` tinyint NOT NULL, `weight` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`tagId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `toWatch` (`user` varchar(255) NOT NULL, `movie` int NOT NULL, INDEX `IDX_1ea3e912fd7c4a355177175431` (`user`), INDEX `IDX_66000ea16533b57d7a9b780125` (`movie`), PRIMARY KEY (`user`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_platform` (`platform` int NOT NULL, `movie` int NOT NULL, INDEX `IDX_3cbb19e5cd833475a475fe41c3` (`platform`), INDEX `IDX_4d3c4c6ee96613bc4ef3673e77` (`movie`), PRIMARY KEY (`platform`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_375b7a802c1041202b6f27c0f43` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_40659918cd465a5cab93ef2deab` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_31fc580c1847949cb41e65a34e0` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_c5c695f219479d1f627143836d0` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_1ea3e912fd7c4a3551771754319` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_66000ea16533b57d7a9b7801254` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` ADD CONSTRAINT `FK_3cbb19e5cd833475a475fe41c33` FOREIGN KEY (`platform`) REFERENCES `platform`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` ADD CONSTRAINT `FK_4d3c4c6ee96613bc4ef3673e771` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `movie_platform` DROP FOREIGN KEY `FK_4d3c4c6ee96613bc4ef3673e771`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` DROP FOREIGN KEY `FK_3cbb19e5cd833475a475fe41c33`"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_66000ea16533b57d7a9b7801254`"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_1ea3e912fd7c4a3551771754319`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_c5c695f219479d1f627143836d0`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_31fc580c1847949cb41e65a34e0`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_40659918cd465a5cab93ef2deab`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_375b7a802c1041202b6f27c0f43`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_4d3c4c6ee96613bc4ef3673e77` ON `movie_platform`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_3cbb19e5cd833475a475fe41c3` ON `movie_platform`"
    );
    await queryRunner.query("DROP TABLE `movie_platform`");
    await queryRunner.query(
      "DROP INDEX `IDX_66000ea16533b57d7a9b780125` ON `toWatch`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_1ea3e912fd7c4a355177175431` ON `toWatch`"
    );
    await queryRunner.query("DROP TABLE `toWatch`");
    await queryRunner.query("DROP TABLE `movie_tag`");
    await queryRunner.query("DROP TABLE `watched`");
    await queryRunner.query("DROP TABLE `tag`");
    await queryRunner.query("DROP TABLE `platform`");
    await queryRunner.query("DROP TABLE `movie`");
    await queryRunner.query("DROP TABLE `user`");
  }
}
