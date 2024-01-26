import { MigrationInterface, QueryRunner } from "typeorm";

export class UserReactions1706300122644 implements MigrationInterface {
    name = 'UserReactions1706300122644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "authorId" integer, "blogId" integer, "parentId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_blog_reaction" ("id" SERIAL NOT NULL, "additionalColumn" character varying NOT NULL, "user_id" integer, "blog_id" integer, "reaction_id" integer, CONSTRAINT "PK_d8dbe316a2741603555fc3a3813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" character varying NOT NULL, "status" character varying NOT NULL, "coverImage" character varying, "createdAt" TIMESTAMP NOT NULL, "publishDate" TIMESTAMP, "authorId" integer, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "websiteUrl" character varying NOT NULL, "location" character varying NOT NULL, "availableFor" character varying NOT NULL, "skill" character varying NOT NULL, "currentProjects" character varying NOT NULL, "pronouns" character varying NOT NULL, "work" character varying NOT NULL, "education" character varying NOT NULL, "brandingColor" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileImage" character varying, "joinDate" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_blogs_blog" ("tagId" integer NOT NULL, "blogId" integer NOT NULL, CONSTRAINT "PK_1b95a368c53662bb8e6262832b0" PRIMARY KEY ("tagId", "blogId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e77dd552e0cb52f65fe460d3b" ON "tag_blogs_blog" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f3492b522e56035b316e109ed9" ON "tag_blogs_blog" ("blogId") `);
        await queryRunner.query(`CREATE TABLE "user_likes_comment" ("userId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_3a78f72d6ea7795ab97da20e941" PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7666b0c76461a2470a285b5468" ON "user_likes_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d005cd7384121ab6d8f7a31e0" ON "user_likes_comment" ("commentId") `);
        await queryRunner.query(`CREATE TABLE "user_following_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_2c183a6c043a59133b516d5daa9" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9691163a986dfb589a90dea3d5" ON "user_following_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_a89f5a432c1edcd03a3b655532" ON "user_following_user" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "user_followers_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_980ff03f415077df184596dcf73" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26312a1e34901011fc6f63545e" ON "user_followers_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_110f993e5e9213a7a44f172b26" ON "user_followers_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_5dec255234c5b7418f3d1e88ce4" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3aebe2bd1c53467a07109be596" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" ADD CONSTRAINT "FK_3180df78e0eeb05d503e7844cbf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" ADD CONSTRAINT "FK_378981250a65b1844cc4bdd07fa" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" ADD CONSTRAINT "FK_ed1b0f21f046f3280d14753454e" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_blogs_blog" ADD CONSTRAINT "FK_3e77dd552e0cb52f65fe460d3b7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_blogs_blog" ADD CONSTRAINT "FK_f3492b522e56035b316e109ed97" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_likes_comment" ADD CONSTRAINT "FK_7666b0c76461a2470a285b54684" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_likes_comment" ADD CONSTRAINT "FK_5d005cd7384121ab6d8f7a31e0d" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_following_user" ADD CONSTRAINT "FK_9691163a986dfb589a90dea3d5f" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_following_user" ADD CONSTRAINT "FK_a89f5a432c1edcd03a3b6555321" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_26312a1e34901011fc6f63545e2" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_110f993e5e9213a7a44f172b264" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_110f993e5e9213a7a44f172b264"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_26312a1e34901011fc6f63545e2"`);
        await queryRunner.query(`ALTER TABLE "user_following_user" DROP CONSTRAINT "FK_a89f5a432c1edcd03a3b6555321"`);
        await queryRunner.query(`ALTER TABLE "user_following_user" DROP CONSTRAINT "FK_9691163a986dfb589a90dea3d5f"`);
        await queryRunner.query(`ALTER TABLE "user_likes_comment" DROP CONSTRAINT "FK_5d005cd7384121ab6d8f7a31e0d"`);
        await queryRunner.query(`ALTER TABLE "user_likes_comment" DROP CONSTRAINT "FK_7666b0c76461a2470a285b54684"`);
        await queryRunner.query(`ALTER TABLE "tag_blogs_blog" DROP CONSTRAINT "FK_f3492b522e56035b316e109ed97"`);
        await queryRunner.query(`ALTER TABLE "tag_blogs_blog" DROP CONSTRAINT "FK_3e77dd552e0cb52f65fe460d3b7"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb"`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" DROP CONSTRAINT "FK_ed1b0f21f046f3280d14753454e"`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" DROP CONSTRAINT "FK_378981250a65b1844cc4bdd07fa"`);
        await queryRunner.query(`ALTER TABLE "user_blog_reaction" DROP CONSTRAINT "FK_3180df78e0eeb05d503e7844cbf"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3aebe2bd1c53467a07109be596"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_5dec255234c5b7418f3d1e88ce4"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_110f993e5e9213a7a44f172b26"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26312a1e34901011fc6f63545e"`);
        await queryRunner.query(`DROP TABLE "user_followers_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a89f5a432c1edcd03a3b655532"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9691163a986dfb589a90dea3d5"`);
        await queryRunner.query(`DROP TABLE "user_following_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d005cd7384121ab6d8f7a31e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7666b0c76461a2470a285b5468"`);
        await queryRunner.query(`DROP TABLE "user_likes_comment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3492b522e56035b316e109ed9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e77dd552e0cb52f65fe460d3b"`);
        await queryRunner.query(`DROP TABLE "tag_blogs_blog"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "user_blog_reaction"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
