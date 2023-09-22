import { addCardstack, updateCardstack } from '../../data/cardstacks'
import { getUserByRequest } from '../../data/auth'
import { updateCard } from '../../data/cards';

export default eventHandler(async (event) => {
    var user = await getUserByRequest(event);
    if(!user) {   
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
    const req = await readBody(event);
    if(req.cardstacks == null) {
        setResponseStatus(event, 403);
        return 'Some parameters are missing. Required parameters: cardstacks';
    }

    var results = [];

    //await Promise.all(req.cardstacks.map(x => updateCardstack(x.id, null, x.order, user.id)));

    for(let cardstack of req.cardstacks) {
        await updateCardstack(cardstack.id, null, cardstack.order, user.id);
        for(let card of cardstack.cards) {
            await updateCard(card.id, cardstack.id, null, null, card.order ?? 0, user.id);
        }  
    }    
    return 'results';

})