import { MigrationInterface, QueryRunner } from "typeorm";

export class UserReactions1706300391749 implements MigrationInterface {
    name = 'UserReactions1706300391749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9ec886924bcd97ae6f14220017a" FOREIGN KEY ("user") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9ec886924bcd97ae6f14220017a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user"`);
    }

}
