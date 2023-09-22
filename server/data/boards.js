import prisma from './prisma'

export async function addBoard(name, authorId) {
  return await prisma.Boards.create({
    data: {name:name, authorId: authorId}
  });
}

export async function getBoards(authorId) {
  return await prisma.Boards.findMany({where:{authorId:authorId, trash:false}});
}
