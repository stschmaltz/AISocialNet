import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTitleFromPost1717821052020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "title" varchar(255)`);
  }
}
