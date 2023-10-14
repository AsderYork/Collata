import prisma from './prisma'

export async function addBoard(name, authorId) {
  return await prisma.Boards.create({
    data: {name:name, authorId: authorId}
  });
}

export async function saveBoard(id, data, authorId) {
  return await prisma.Boards.update({where:{id:id}, data:data});
}


export async function getBoards(authorId) {
  return await prisma.Boards.findMany({where:{authorId:authorId, trash:false}});
}

export async function getBoard(authorId, id) {
  return await prisma.Boards.findFirst({where:{authorId:authorId, id:id}});
}

export async function deleteBoard(id, authorId) {
  return await prisma.Boards.update({where:{id:id}, data:{trash:true}});
}
