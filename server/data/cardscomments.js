import prisma from './prisma'

export async function addCardComment(card, text, authorId) {
  return await prisma.CardsComments.create({
    data: {cardId:parseInt(card), text:text, authorId: authorId}
  });
}

export async function getCardComments(cardId) {
  return await prisma.CardsComments.findMany({where:{cardId:parseInt(cardId), trash:false}, orderBy: [{order:'asc'}]});
}

export async function updateCardComment(id, text, authorId) {

  var data = {};
  if(text) {data.text = text;}

  return await prisma.CardsComments.update({
    where: {
      id:id
    },
    data: data
  });
}

export async function deleteCardComment(id, authorId) {
  return await prisma.CardsComments.update({
    where: {
      id:id
    },
    data: {trash:true}
  });
}
