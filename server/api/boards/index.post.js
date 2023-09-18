import { addBoard } from '../../data/boards'
import { getServerSession } from '#auth'

export default eventHandler(async (event) => {

    //const req = await readBody(event);
    /*if(req.name) {
        addBoard(req.name)
    }*/
  const session = await getServerSession(event)

    console.log(session);

    return 'jio';

})