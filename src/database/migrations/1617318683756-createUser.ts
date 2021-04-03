import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1617318683756 implements MigrationInterface {
  name = "createUser1617318683756";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `users` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `photoPath` varchar(255) NOT NULL, `randomness` int NOT NULL, `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `users`");
  }
}
