import { defu } from 'defu'

export function useCustomFetch(url: string, options?: any) {
  const token = window.localStorage.getItem('token')
  const config = useRuntimeConfig()
  const baseUrl = (config.public.NUXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000') + '/api'
  const isOtherDomain = url.startsWith('http')

  const defaults = {
    baseURL: isOtherDomain ? url : baseUrl,
    // cache request
    key: isOtherDomain ? '' : url,

    // set user token if connected
    headers: token && url.includes('/auth')
      ? { Authorization: token }
      : {},

    onResponse(_ctx: any) {
    },

    onResponseError(_ctx: any) {
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)
  console.log(`Making request to ${baseUrl + url}`)
  return useFetch(url, params)
}
