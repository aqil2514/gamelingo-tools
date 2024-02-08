-- CreateTable
CREATE TABLE "UsersLogin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersLogin_username_key" ON "UsersLogin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UsersLogin_email_key" ON "UsersLogin"("email");
