import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMainSchemas1686148929616 implements MigrationInterface {
  name = 'CreateMainSchemas1686148929616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."roles_name_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "social_insurance_number" character varying NOT NULL, "birth_date" date, "phone_number" character varying, "is_alive" boolean NOT NULL DEFAULT true, "email" character varying, "country" character varying, "city" character varying, "street" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "social_insurance_id" integer, "created_by" integer, CONSTRAINT "REL_777f944408139b879496bef449" UNIQUE ("created_by"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_insurances" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0ed3ab1850126dfc8a1ee0dce1c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userIdId" integer, CONSTRAINT "REL_817094bf9519da004189db3c30" UNIQUE ("userIdId"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_to_roles" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_3c5401b4b6598b480175395e360" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e93c6d34c8fe01dded0844b0ad" ON "users_to_roles" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1ea0fe52eda3311425a3d253f" ON "users_to_roles" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors_to_specialities" ("doctor_id" integer NOT NULL, "speciality_id" integer NOT NULL, CONSTRAINT "PK_8dac8aef2a00a90496732ed4e37" PRIMARY KEY ("doctor_id", "speciality_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66f980d9208dce611a6110f860" ON "doctors_to_specialities" ("doctor_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ba35c2e73aedbba8ed33f9bd58" ON "doctors_to_specialities" ("speciality_id") `,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "surname"`);
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "REL_817094bf9519da004189db3c30"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "userIdId"`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "surname" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ADD "userIdId" integer`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "UQ_817094bf9519da004189db3c30a" UNIQUE ("userIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_7b74f880323df83f32d79e75b25" FOREIGN KEY ("social_insurance_id") REFERENCES "social_insurances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_777f944408139b879496bef4495" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_817094bf9519da004189db3c30a" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_to_roles" ADD CONSTRAINT "FK_e93c6d34c8fe01dded0844b0ada" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_to_roles" ADD CONSTRAINT "FK_e1ea0fe52eda3311425a3d253f6" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors_to_specialities" ADD CONSTRAINT "FK_66f980d9208dce611a6110f860b" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors_to_specialities" ADD CONSTRAINT "FK_ba35c2e73aedbba8ed33f9bd58d" FOREIGN KEY ("speciality_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors_to_specialities" DROP CONSTRAINT "FK_ba35c2e73aedbba8ed33f9bd58d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors_to_specialities" DROP CONSTRAINT "FK_66f980d9208dce611a6110f860b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_to_roles" DROP CONSTRAINT "FK_e1ea0fe52eda3311425a3d253f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_to_roles" DROP CONSTRAINT "FK_e93c6d34c8fe01dded0844b0ada"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_817094bf9519da004189db3c30a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_777f944408139b879496bef4495"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_7b74f880323df83f32d79e75b25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "UQ_817094bf9519da004189db3c30a"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "userIdId"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "surname"`);
    await queryRunner.query(`ALTER TABLE "doctors" ADD "userIdId" integer`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "REL_817094bf9519da004189db3c30" UNIQUE ("userIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "surname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ba35c2e73aedbba8ed33f9bd58"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66f980d9208dce611a6110f860"`,
    );
    await queryRunner.query(`DROP TABLE "doctors_to_specialities"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1ea0fe52eda3311425a3d253f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e93c6d34c8fe01dded0844b0ad"`,
    );
    await queryRunner.query(`DROP TABLE "users_to_roles"`);
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TABLE "social_insurances"`);
    await queryRunner.query(`DROP TABLE "patients"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
  }
}
