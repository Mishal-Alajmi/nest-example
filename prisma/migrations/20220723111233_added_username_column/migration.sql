/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ALTER COLUMN "login_attempts" SET DEFAULT 0,
ALTER COLUMN "last_login_attempt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "is_email_verified" SET DEFAULT false,
ALTER COLUMN "is_mobile_verified" SET DEFAULT false,
ALTER COLUMN "is_biometrics" SET DEFAULT false,
ALTER COLUMN "is_profile_completed" SET DEFAULT false,
ALTER COLUMN "is_deleted" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
