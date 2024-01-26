import { MigrationInterface, QueryRunner } from "typeorm";

export class Testing1706302654661 implements MigrationInterface {
    name = 'Testing1706302654661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "UQ_9405dcca01607bf0b396136e263" UNIQUE ("type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "UQ_9405dcca01607bf0b396136e263"`);
    }

}
