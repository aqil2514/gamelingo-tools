/*
  Warnings:

  - Added the required column `image` to the `UsersLogin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersLogin" ADD COLUMN     "image" TEXT NOT NULL;
