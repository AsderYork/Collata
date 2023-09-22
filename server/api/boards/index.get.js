import { getBoards } from '../../data/boards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);
    if(user) {
        return getBoards(user.id);
    }
    
    setResponseStatus(event, 403);
    return 'Invalid token';

});
