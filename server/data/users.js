import prisma from './prisma'


export async function getUserByLoginPassword(login, password) {
  const user = await prisma.Users.findFirst({where:{login:login, password:password}});
  return user
}