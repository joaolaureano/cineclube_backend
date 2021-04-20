import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTables1618878794618 implements MigrationInterface {
  name = "alterTables1618878794618";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user_movie` (`userId` varchar(255) NOT NULL, `movieId` int NOT NULL, `status` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `cast` (`actorId` varchar(255) NOT NULL, `movieId` int NOT NULL, `director` tinyint NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`actorId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `actor` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query("ALTER TABLE `movie` ADD `duration` int NOT NULL");
    await queryRunner.query(
      "ALTER TABLE `user_movie` ADD CONSTRAINT `FK_13836cd6ae56580075e1bd33967` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` ADD CONSTRAINT `FK_3e731d371b40a498f72b3e57d9d` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` ADD CONSTRAINT `FK_d3ec511ff2f2564f167064a2ee0` FOREIGN KEY (`actorId`) REFERENCES `actor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` ADD CONSTRAINT `FK_dcacf1ce3d9cc81bc6427f0f6b3` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_66000ea16533b57d7a9b7801254`"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_1ea3e912fd7c4a3551771754319`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_40659918cd465a5cab93ef2deab`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_375b7a802c1041202b6f27c0f43`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_66000ea16533b57d7a9b780125` ON `toWatch`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_1ea3e912fd7c4a355177175431` ON `toWatch`"
    );
    await queryRunner.query("DROP TABLE `toWatch`");
    await queryRunner.query("DROP TABLE `watched`");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `cast` DROP FOREIGN KEY `FK_dcacf1ce3d9cc81bc6427f0f6b3`"
    );
    await queryRunner.query(
      "ALTER TABLE `cast` DROP FOREIGN KEY `FK_d3ec511ff2f2564f167064a2ee0`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` DROP FOREIGN KEY `FK_3e731d371b40a498f72b3e57d9d`"
    );
    await queryRunner.query(
      "ALTER TABLE `user_movie` DROP FOREIGN KEY `FK_13836cd6ae56580075e1bd33967`"
    );
    await queryRunner.query(
      "CREATE TABLE `watched` (`userId` varchar(255) NOT NULL, `movieId` int NOT NULL, `liked` tinyint NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`userId`, `movieId`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `toWatch` (`user` varchar(255) NOT NULL, `movie` int NOT NULL, INDEX `IDX_1ea3e912fd7c4a355177175431` (`user`), INDEX `IDX_66000ea16533b57d7a9b780125` (`movie`), PRIMARY KEY (`user`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_375b7a802c1041202b6f27c0f43` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_40659918cd465a5cab93ef2deab` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_1ea3e912fd7c4a3551771754319` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_66000ea16533b57d7a9b7801254` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query("ALTER TABLE `movie` DROP COLUMN `duration`");
    await queryRunner.query("DROP TABLE `actor`");
    await queryRunner.query("DROP TABLE `cast`");
    await queryRunner.query("DROP TABLE `user_movie`");
  }
}
