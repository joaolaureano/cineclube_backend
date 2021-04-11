import { MigrationInterface, QueryRunner } from "typeorm";

export class alterWatchedRelations1618167243108 implements MigrationInterface {
  name = "alterWatchedRelations1618167243108";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_c9d55b812b15533a355089f0f39`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_e432d2d37a34576cb2faaa93625`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched`"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`user`)");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `movie`");
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `user`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `userId` varchar(255) NOT NULL PRIMARY KEY"
    );
    await queryRunner.query("ALTER TABLE `watched` ADD `movieId` int NOT NULL");
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD PRIMARY KEY (`userId`, `movieId`)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_375b7a802c1041202b6f27c0f43` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_40659918cd465a5cab93ef2deab` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_40659918cd465a5cab93ef2deab`"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` DROP FOREIGN KEY `FK_375b7a802c1041202b6f27c0f43`"
    );
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`userId`)");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `movieId`");
    await queryRunner.query("ALTER TABLE `watched` DROP COLUMN `userId`");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD `user` varchar(255) NOT NULL"
    );
    await queryRunner.query("ALTER TABLE `watched` ADD PRIMARY KEY (`user`)");
    await queryRunner.query("ALTER TABLE `watched` ADD `movie` int NOT NULL");
    await queryRunner.query("ALTER TABLE `watched` DROP PRIMARY KEY");
    await queryRunner.query(
      "ALTER TABLE `watched` ADD PRIMARY KEY (`movie`, `user`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_e432d2d37a34576cb2faaa9362` ON `watched` (`movie`)"
    );
    await queryRunner.query(
      "CREATE INDEX `IDX_c9d55b812b15533a355089f0f3` ON `watched` (`user`)"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_e432d2d37a34576cb2faaa93625` FOREIGN KEY (`movie`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `watched` ADD CONSTRAINT `FK_c9d55b812b15533a355089f0f39` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }
}
