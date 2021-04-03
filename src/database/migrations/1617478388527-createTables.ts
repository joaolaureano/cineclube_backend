import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1617478388527 implements MigrationInterface {
  name = "createTables1617478388527";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `photoPath` varchar(255) NOT NULL, `randomness` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `watched` (`user` int NOT NULL, `movie` int NOT NULL, `liked` tinyint NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`user`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `originalTitle` varchar(255) NOT NULL, `synopsis` varchar(255) NOT NULL, `critic` varchar(255) NOT NULL, `curator` varchar(255) NOT NULL, `year` char(4) NOT NULL, `pathBanner` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `platform` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `toWatch` (`user` varchar(255) NOT NULL, `movie` int NOT NULL, INDEX `IDX_1ea3e912fd7c4a355177175431` (`user`), INDEX `IDX_66000ea16533b57d7a9b780125` (`movie`), PRIMARY KEY (`user`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_platform` (`platform` int NOT NULL, `movie` int NOT NULL, INDEX `IDX_3cbb19e5cd833475a475fe41c3` (`platform`), INDEX `IDX_4d3c4c6ee96613bc4ef3673e77` (`movie`), PRIMARY KEY (`platform`, `movie`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `movie_tag` (`movie` int NOT NULL, `tag` int NOT NULL, INDEX `IDX_3c1030e8249a66249742903f36` (`movie`), INDEX `IDX_66e20a8048e4efe8450e71611b` (`tag`), PRIMARY KEY (`movie`, `tag`)) ENGINE=InnoDB"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `liked`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `created_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `updated_At`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `liked` tinyint NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`movie`)");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `user`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `user` varchar(255) NOT NULL"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD PRIMARY KEY (`movie`, `user`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched` (`user`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched` (`movie`)"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_1ea3e912fd7c4a3551771754319` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` ADD CONSTRAINT `FK_66000ea16533b57d7a9b7801254` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_c9d55b812b15533a355089f0f39` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_e432d2d37a34576cb2faaa93625` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` ADD CONSTRAINT `FK_3cbb19e5cd833475a475fe41c33` FOREIGN KEY (`platform`) REFERENCES `platform`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` ADD CONSTRAINT `FK_4d3c4c6ee96613bc4ef3673e771` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_3c1030e8249a66249742903f363` FOREIGN KEY (`movie`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_66e20a8048e4efe8450e71611bd` FOREIGN KEY (`tag`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_66e20a8048e4efe8450e71611bd`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_3c1030e8249a66249742903f363`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` DROP FOREIGN KEY `FK_4d3c4c6ee96613bc4ef3673e771`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_platform` DROP FOREIGN KEY `FK_3cbb19e5cd833475a475fe41c33`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_e432d2d37a34576cb2faaa93625`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_c9d55b812b15533a355089f0f39`"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_66000ea16533b57d7a9b7801254`"
    );
    await queryRunner.query(
      "ALTER TABLE `toWatch` DROP FOREIGN KEY `FK_1ea3e912fd7c4a3551771754319`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched`"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`movie`)");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `user`");
    await queryRunner.query("ALTER TABLE `watched` ADD `user` int NOT NULL");
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD PRIMARY KEY (`user`, `movie`)"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `updated_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `created_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `liked`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `liked` tinyint NOT NULL"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_66e20a8048e4efe8450e71611b` ON `movie_tag`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_3c1030e8249a66249742903f36` ON `movie_tag`"
    );
    await queryRunner.query("DROP TABLE `movie_tag`");
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
    await queryRunner.query("DROP TABLE `tag`");
    await queryRunner.query("DROP TABLE `platform`");
    await queryRunner.query("DROP TABLE `movie`");
    await queryRunner.query("DROP TABLE `watched`");
    await queryRunner.query("DROP TABLE `user`");
  }
}
