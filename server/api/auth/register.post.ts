import z from 'zod'
import { sign } from 'jsonwebtoken'
import { addUser, checkUser, getUsersByLogin } from '../../data/users'

const refreshTokens: Record<number, Record<string, any>> = {}
export const SECRET = 'dummy'

export default eventHandler(async (event) => {
  const result = z.object({ login: z.string().min(1), password: z.string().min(1) }).safeParse(await readBody(event))
  if (!result.success) {
    throw createError({ statusCode: 403, statusMessage: 'User login/password pair invalid' })
  }

  var user = await getUsersByLogin(result.data.login);
  if (user !== null && user.length > 0) {
    throw createError({ statusCode: 403, statusMessage: 'User with this login allready exists' })
  }

  addUser(result.data.login, result.data.password);
  user = checkUser(result.data.login, result.data.password);

  const expiresIn = 60*10
  const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
  const accessToken = sign({ ...user, scope: ['test', 'user'] }, SECRET, { expiresIn })
  refreshTokens[refreshToken] = {
    accessToken,
    user
  }

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})