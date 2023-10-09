import { addBoard } from '../../data/boards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(user) {
        const req = await readBody(event);
        return addBoard(req.name, user.id);
    }

    
    setResponseStatus(event, 403);
    return 'Invalid token';

})