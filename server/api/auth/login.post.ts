import z from 'zod'
import { sign } from 'jsonwebtoken'
import { addUser, checkUser } from '../../data/users'

const refreshTokens: Record<number, Record<string, any>> = {}
export const SECRET = 'dummy'

export default eventHandler(async (event) => {
  const result = z.object({ login: z.string().min(1), password: z.string().min(1) }).safeParse(await readBody(event))
  if (!result.success) {
    throw createError({ statusCode: 403, statusMessage: 'User login/password pair invalid' })
  }

  var user = await checkUser(result.data.login, result.data.password);
  if (user === null) {
    throw createError({ statusCode: 403, statusMessage: 'Wrong login/password' })
  }


  const expiresIn = 60*60*24*3
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