// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
      provider: {
          type: 'local',
          endpoints: {
              signIn: { path: '/login', method: 'post' },
              signOut: { path: '/logout', method: 'post' },
              signUp: { path: '/register', method: 'post' },
              getSession: { path: '/user', method: 'get' }
          },
          pages: {
            login: '/auth'
          },
          token: {
            signInResponseTokenPointer: '/token/accessToken'
          },
      },
      session: {
        // Whether to refresh the session every time the browser window is refocused.
        enableRefreshOnWindowFocus: true,
  
        // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
        enableRefreshPeriodically: 5000
      },
    globalAppMiddleware: {
      isEnabled: true
    }
      
  },
  css: [
    '~/assets/styles/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  
  pages: true,
  build: {
    transpile: [
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        'jsonwebtoken',
    ]
  },
})
