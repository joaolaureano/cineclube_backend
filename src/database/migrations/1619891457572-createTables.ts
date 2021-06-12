import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1619891457572 implements MigrationInterface {
  name = "createTables1619891457572";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `photoPath` varchar(255) NOT NULL, `randomness` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `originalTitle` varchar(255) NOT NULL, `synopsis` text NOT NULL, `critic` text NOT NULL, `curator` varchar(255) NOT NULL, `year` char(4) NOT NULL, `pathBanner` text NOT NULL, `duration` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `platform` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `user_movie` (`userId` varchar(255) NOT NULL, `movieId` int NOT NULL, `status` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_tag` (`tagId` int NOT NULL, `movieId` int NOT NULL, `super` tinyint NOT NULL, `weight` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`tagId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `cast` (`actorId` int NOT NULL, `movieId` int NOT NULL, `director` tinyint NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`actorId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `user_tag` (`userId` varchar(255) NOT NULL, `tagId` int NOT NULL, `totalPoint` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `tagId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `actor` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_platform` (`platform` int NOT NULL, `movie` int NOT NULL, INDEX `IDX_3cbb19e5cd833475a475fe41c3` (`platform`), INDEX `IDX_4d3c4c6ee96613bc4ef3673e77` (`movie`), PRIMARY KEY (`platform`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` ADD CONSTRAINT `FK_13836cd6ae56580075e1bd33967` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` ADD CONSTRAINT `FK_3e731d371b40a498f72b3e57d9d` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_31fc580c1847949cb41e65a34e0` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_c5c695f219479d1f627143836d0` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` ADD CONSTRAINT `FK_d3ec511ff2f2564f167064a2ee0` FOREIGN KEY (`actorId`) REFERENCES `actor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` ADD CONSTRAINT `FK_dcacf1ce3d9cc81bc6427f0f6b3` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_tag` ADD CONSTRAINT `FK_7cf25d8a11ccc18f04cbd8cb46c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_tag` ADD CONSTRAINT `FK_d1c8261be4e02dc1df64636250c` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
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
      "ALTER TABLE `user_tag` DROP FOREIGN KEY `FK_d1c8261be4e02dc1df64636250c`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_tag` DROP FOREIGN KEY `FK_7cf25d8a11ccc18f04cbd8cb46c`"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` DROP FOREIGN KEY `FK_dcacf1ce3d9cc81bc6427f0f6b3`"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` DROP FOREIGN KEY `FK_d3ec511ff2f2564f167064a2ee0`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_c5c695f219479d1f627143836d0`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_31fc580c1847949cb41e65a34e0`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` DROP FOREIGN KEY `FK_3e731d371b40a498f72b3e57d9d`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` DROP FOREIGN KEY `FK_13836cd6ae56580075e1bd33967`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_4d3c4c6ee96613bc4ef3673e77` ON `movie_platform`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_3cbb19e5cd833475a475fe41c3` ON `movie_platform`"
    );
    await queryRunner.query("DROP TABLE `movie_platform`");
    await queryRunner.query("DROP TABLE `actor`");
    await queryRunner.query("DROP TABLE `user_tag`");
    await queryRunner.query("DROP TABLE `cast`");
    await queryRunner.query("DROP TABLE `movie_tag`");
    await queryRunner.query("DROP TABLE `user_movie`");
    await queryRunner.query("DROP TABLE `tag`");
    await queryRunner.query("DROP TABLE `platform`");
    await queryRunner.query("DROP TABLE `movie`");
    await queryRunner.query("DROP TABLE `user`");
  }
}
