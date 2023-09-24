import prisma from './prisma'
import { v4 as uuidv4 } from 'uuid';

export async function addCardstack(board, order, name, authorId) {
  return await prisma.Cardstacks.create({
    data: {boardId:parseInt(board), order:parseInt(order), name:name, authorId: authorId, uuid:uuidv4()}
  });
}

export async function getCardstacks(board, withCards) {

  var reqBlock = {where:{boardId:parseInt(board), trash:false}, orderBy: {order:'asc'}};
  if(withCards) {
    reqBlock['include'] = {
      cards:{
        orderBy:{order:'asc'}, 
        where:{trash:false}, 
        include:{
          cardsComments:{
            include:{author:true},
            where:{trash:false}
          }
        }
      }
    }
  }

  var data = await prisma.Cardstacks.findMany(reqBlock);
  return data;
}

export async function updateCardstack(id, name, order, authorId) {

  var data = {};
  if(name) {data.name = name;}
  if(order) {data.order = parseInt(order);}


  return await prisma.Cardstacks.update({
    where: {
      id:id
    },
    data: data
  });
}

export async function deleteCardstack(id, authorId) {
  return await prisma.Cardstacks.update({
    where: {
      id:id
    },
    data: {trash:true}
  });
}
