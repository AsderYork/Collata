import { deleteCard } from '../../data/cards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(!user) {   
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
    const req = await readBody(event);
    if(req.id == null) {
        setResponseStatus(event, 403);
        return 'Some parameters are missing. Required parameters: id';
    }

    return deleteCard(req.id, user.id);

})