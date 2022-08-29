/*
  Warnings:

  - The primary key for the `Lawyer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lawyer_id` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to alter the column `number_of_cases` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `number_of_testimonials` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `number_of_references` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `rate_per_minute` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `years_of_experience` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `description` on the `Lawyer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `hash` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(33)`.
  - You are about to alter the column `bio` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `refered_by` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `login_attempts` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - A unique constraint covering the columns `[userId]` on the table `Lawyer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_userId_fkey";

-- AlterTable
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_pkey",
DROP COLUMN "lawyer_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "number_of_cases" SET DATA TYPE SMALLINT,
ALTER COLUMN "number_of_testimonials" SET DATA TYPE SMALLINT,
ALTER COLUMN "number_of_references" SET DATA TYPE SMALLINT,
ALTER COLUMN "rate_per_minute" SET DATA TYPE SMALLINT,
ALTER COLUMN "years_of_experience" SET DATA TYPE SMALLINT,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "is_verified" DROP NOT NULL,
ALTER COLUMN "is_currently_available" DROP NOT NULL,
ALTER COLUMN "is_deleted" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ADD CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "hash" SET DATA TYPE VARCHAR(33),
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "refered_by" DROP NOT NULL,
ALTER COLUMN "refered_by" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "login_attempts" DROP NOT NULL,
ALTER COLUMN "login_attempts" SET DATA TYPE SMALLINT,
ALTER COLUMN "last_login_attempt" DROP NOT NULL,
ALTER COLUMN "is_email_verified" DROP NOT NULL,
ALTER COLUMN "is_mobile_verified" DROP NOT NULL,
ALTER COLUMN "is_biometrics" DROP NOT NULL,
ALTER COLUMN "is_profile_completed" DROP NOT NULL,
ALTER COLUMN "is_deleted" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_userId_key" ON "Lawyer"("userId");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
