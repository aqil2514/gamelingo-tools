import prisma from "./prisma";

export async function getUsers({ username = "" }) {
  const allUsers = await prisma.usersLogin.findMany(username);

  return allUsers;
}

export async function checkUser(username = "") {
  const user = await prisma.usersLogin.findMany({
    where: { username },
  });
  return user;
}
