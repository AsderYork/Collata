import { getBoards, getBoard } from '../../data/boards'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {
    var user = await getUserByRequest(event);
    if(user) {
        const query = getQuery(event)
        if(query.id) {
            return getBoard(user.id, parseInt(query.id));
        }
        return getBoards(user.id);
    }
    
    setResponseStatus(event, 403);
    return 'Invalid token';

});
