const CONFIG = {
  'development': {
    appName: process.env.NUXT_PUBLIC_APP_NAME || 'YOUR_APP_NAME',
    apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT || 'YOUR_API_ENDPOINT'
  },
  'uat': {
    appName: process.env.NUXT_PUBLIC_APP_NAME || 'YOUR_APP_NAME',
    apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT || 'YOUR_API_ENDPOINT'
  },
  'production': {
    appName: process.env.NUXT_PUBLIC_APP_NAME || 'YOUR_APP_NAME',
    apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT || 'YOUR_API_ENDPOINT'
  }
}

export const getConfig = (env: string) => CONFIG[env as keyof typeof CONFIG || 'development']
