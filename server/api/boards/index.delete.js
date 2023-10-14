import { deleteBoard } from '../../data/boards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);

    if(user) {
        const req = await readBody(event);
        return deleteBoard(req.id, user.id);
    }

    setResponseStatus(event, 403);
    return 'Invalid token';

})