import { addCardstack, updateCardstack } from '../../data/cardstacks'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(!user) {   
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
    const req = await readBody(event);
    if(req.board == null || req.name == null) {
        setResponseStatus(event, 403);
        return 'Some parameters are missing. Required parameters: board, name';
    }

    if(req.id) {
        return updateCardstack(req.id, req.name, req.order, user.id);
    } else {
        return addCardstack(req.board, req.order ?? 0, req.name, user.id);
    }
    

})