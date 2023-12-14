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

export async function checkResetLink({ where }) {
  const link = await prisma.resetPassword.findMany({ where });

  return link;
}

export async function addResetLink(data) {
  const link = await prisma.resetPassword.create({ data });
  return link;
}

export async function updateResetLink(where, data) {
  const link = await prisma.resetPassword.update({ where, data });
  return link;
}

export async function deleteResetLink(where) {
  const link = await prisma.resetPassword.deleteMany({ where });
  return link;
}

export async function addVerificationCode(data) {
  const code = await prisma.verificationCode.create({
    data,
  });

  return code;
}

export async function checkVerificationCode(where) {
  const code = await prisma.verificationCode.findMany({ where });
  return code;
}

export async function updateVerificationCode(where, data) {
  const code = await prisma.verificationCode.update({ where, data });
  return code;
}

export async function deleteVerificationCode(where) {
  const code = await prisma.verificationCode.deleteMany({ where });
  return code;
}
