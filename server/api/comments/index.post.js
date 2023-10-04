import { addCardComment, updateCardComment } from '../../data/cardscomments'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(!user) {   
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
    const req = await readBody(event);
    if(((req.card == null) && (req.id == null)) || req.text == null) {
        setResponseStatus(event, 403);
        return 'Some parameters are missing. Required parameters: text, card or id';
    }

    if(req.id) {
        return updateCardComment(req.id, req.text, user.id);
    } else {
        return addCardComment(req.card, req.text, user.id);
    }
    

})