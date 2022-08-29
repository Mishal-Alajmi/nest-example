-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "RegistrationEndpoint" AS ENUM ('WEB', 'IOS', 'ANDROID');

-- CreateEnum
CREATE TYPE "CountryCodes" AS ENUM ('SA', 'AE', 'KW', 'BH', 'QA', 'OM', 'JO', 'EG');

-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('BUSINESS', 'INTERNATIONAL', 'CRIMINAL', 'INTELLICTUAL', 'ISLAMIC', 'STATUE', 'INVESTING', 'MARITAL');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "hash" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT E'MALE',
    "avatar_url" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "refered_by" TEXT NOT NULL,
    "registration_endpoint" "RegistrationEndpoint" NOT NULL DEFAULT E'WEB',
    "country_code" "CountryCodes" NOT NULL DEFAULT E'SA',
    "city" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(50) NOT NULL,
    "login_attempts" INTEGER NOT NULL,
    "last_login_attempt" TIMESTAMP(3) NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL,
    "is_mobile_verified" BOOLEAN NOT NULL,
    "is_biometrics" BOOLEAN NOT NULL,
    "is_profile_completed" BOOLEAN NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Lawyer" (
    "lawyer_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialization" "Specialization" NOT NULL DEFAULT E'BUSINESS',
    "rating" INTEGER[],
    "number_of_cases" INTEGER NOT NULL,
    "number_of_testimonials" INTEGER NOT NULL,
    "number_of_references" INTEGER NOT NULL,
    "rate_per_minute" INTEGER NOT NULL,
    "years_of_experience" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "introduction_video" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "is_currently_available" BOOLEAN NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("lawyer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
