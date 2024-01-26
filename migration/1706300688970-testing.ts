import { MigrationInterface, QueryRunner } from "typeorm";

export class Testing1706300688970 implements MigrationInterface {
    name = 'Testing1706300688970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9ec886924bcd97ae6f14220017a"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" TO "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" TO "UQ_9ec886924bcd97ae6f14220017a"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "profileId" TO "user"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9ec886924bcd97ae6f14220017a" FOREIGN KEY ("user") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
