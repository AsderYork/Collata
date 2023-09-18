import prisma from './prisma'
import bcrypt from 'bcrypt';

export async function getUsersByLogin(login) {
  const users = await prisma.Users.findMany({where:{login:login}});
  return users;
}



export async function addUser(login, password, name=null, extraData = {}) {

  name = name ?? login;

  const hash = bcrypt.hashSync(password, 10);

  await prisma.Users.create({
    data: Object.assign({
      login:login,
      password: hash,
      name:name,
    }, extraData)
  })

}



export async function checkUser(login, password) {

  var users = await getUsersByLogin(login);


  if(users.length === 0) {
    return null;
  }

  for(let user of users) {
    
    if(bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
  }

  return null;
  
}
