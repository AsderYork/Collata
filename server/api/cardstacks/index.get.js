import { getCardstacks } from '../../data/cardstacks'
import { getUserByRequest } from '../../data/auth'

export default eventHandler(async (event) => {

    var user = await getUserByRequest(event);
    if(!user) {
        setResponseStatus(event, 403);
        return 'Invalid token';
    }
    
  const { board } = getQuery(event);
  return getCardstacks(board, true);
    

});
