import prisma from './prisma'

export async function addBoard(name, authorId) {
  const hash = bcrypt.hashSync(password, 10);

  return await prisma.Boards.create({
    data: {name:name, authorId: authorId}
  });
}

export async function getBoards(authorId) {
  const users = await prisma.Boards.findMany({where:{authorId:authorId, trash:false}});
}