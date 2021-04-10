import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableTag1618091587949 implements MigrationInterface {
  name = "alterTableTag1618091587949";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_c9d55b812b15533a355089f0f39`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_e432d2d37a34576cb2faaa93625`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_3c1030e8249a66249742903f363`"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` DROP FOREIGN KEY `FK_66e20a8048e4efe8450e71611bd`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_3c1030e8249a66249742903f36` ON `movie_tag`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_66e20a8048e4efe8450e71611b` ON `movie_tag`"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `created_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `liked`");
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
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD `super` tinyint NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD `weight` int NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`movie`)");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `user`");
    await queryRunner.query("ALTER TABLE `watched` ADD `user` int NOT NULL");
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD PRIMARY KEY (`movie`, `user`)"
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
      "CREATE INDEX `IDX_3c1030e8249a66249742903f36` ON `movie_tag` (`movie`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_66e20a8048e4efe8450e71611b` ON `movie_tag` (`tag`)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_c9d55b812b15533a355089f0f39` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_e432d2d37a34576cb2faaa93625` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
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
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_e432d2d37a34576cb2faaa93625`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_c9d55b812b15533a355089f0f39`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_66e20a8048e4efe8450e71611b` ON `movie_tag`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_3c1030e8249a66249742903f36` ON `movie_tag`"
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
      "ALTER TABLE `watched` ADD PRIMARY KEY (`movie`, `user`)"
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
    await queryRunner.query("ALTER TABLE `movie_tag` DROP COLUMN `updated_At`");
    await queryRunner.query("ALTER TABLE `movie_tag` DROP COLUMN `created_At`");
    await queryRunner.query("ALTER TABLE `movie_tag` DROP COLUMN `weight`");
    await queryRunner.query("ALTER TABLE `movie_tag` DROP COLUMN `super`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `updated_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `created_At`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `liked`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `liked` tinyint NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_66e20a8048e4efe8450e71611b` ON `movie_tag` (`tag`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_3c1030e8249a66249742903f36` ON `movie_tag` (`movie`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched` (`movie`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched` (`user`)"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_66e20a8048e4efe8450e71611bd` FOREIGN KEY (`tag`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `movie_tag` ADD CONSTRAINT `FK_3c1030e8249a66249742903f363` FOREIGN KEY (`movie`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_e432d2d37a34576cb2faaa93625` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_c9d55b812b15533a355089f0f39` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }
}
