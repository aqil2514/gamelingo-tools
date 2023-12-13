import prisma from "./prisma";

export async function getUsers() {
  const allUsers = await prisma.usersLogin.findMany();

  return allUsers;
}

export async function checkUser(username = "") {
  const user = await prisma.usersLogin.findMany({
    where: { username },
  });
  return user;
}
export async function checkEmail(email = "") {
  const user = await prisma.usersLogin.findMany({
    where: { email },
  });
  return user;
}

export async function addUser(data) {
  const user = await prisma.usersLogin.create({ data });
  return user;
}

export async function updateUser(where, data) {
  const user = await prisma.usersLogin.update({
    where,
    data,
  });

  return user;
}
