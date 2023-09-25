import { H3Event } from 'h3'
import { verify } from 'jsonwebtoken'

const TOKEN_TYPE = 'Bearer'

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
  return token
}

const ensureAuth = (event: H3Event) => {
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined') {
    throw createError({ statusCode: 403, statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint' })
  }

  const extractedToken = extractToken(authHeaderValue)


  try {
    const user = verify(extractedToken, useRuntimeConfig().secret);
    const timeRemaning = user['exp'] - (Date.now() / 1000);
    if(timeRemaning < 10) {
    console.log('time is running out on this token!')
    }
    
    return verify(extractedToken, SECRET)
  } catch (error) {
    console.error('Login failed. Here\'s the raw error:', error)
    throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
  }
}

export default eventHandler((event) => {

  console.log

  const user = ensureAuth(event)
  return user
})