import { addCard, updateCard } from '../../data/cards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(!user) {   
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
    const req = await readBody(event);
    if(req.cardstack == null || req.name == null) {
        setResponseStatus(event, 403);
        return 'Some parameters are missing. Required parameters: cardstack, name';
    }

    if(req.id) {
        return updateCard(req.id, req.cardstack, req.name, req.text, req.order ?? 0, user.id);
    } else {
        return addCard(req.cardstack, req.name, req.text, req.order ?? 0, user.id);
    }
    

})