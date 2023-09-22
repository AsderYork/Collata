import prisma from './prisma'
import { v4 as uuidv4 } from 'uuid';

export async function addCard(cardstack, name, text, order, authorId) {
  return await prisma.Cards.create({
    data: {cardstackId:parseInt(cardstack), order:parseInt(order), name:name, text:text, authorId: authorId, uuid:uuidv4()}
  });
}

export async function getCards(cardstack) {
  return await prisma.Cards.findMany({where:{cardstackId:parseInt(cardstack), trash:false}, orderBy: [{order:'asc'}]});
}

export async function updateCard(id, cardstack, name, text, order, authorId) {

  var data = {};
  if(name) {data.name = name;}
  if(text) {data.text = text;}
  if(order) {data.order = parseInt(order);}
  if(cardstack) {data.cardstackId = parseInt(cardstack);}


  return await prisma.Cards.update({
    where: {
      id:id
    },
    data: data
  });
}

export async function deleteCard(id, authorId) {
  return await prisma.Cards.update({
    where: {
      id:id
    },
    data: {trash:true}
  });
}
