-- AlterTable
ALTER TABLE "UsersLogin" ADD COLUMN     "OAuthId" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
