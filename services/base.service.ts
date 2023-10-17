// import { isEmpty } from 'lodash'
import { getConfig } from '~/config'
import { isBoolean, trim } from 'lodash'
import { useCustomFetch } from '~/composable/useCustomFetch.js'
import { RequesListingType } from '~/helpers/types'

class BaseService {
  config: any
  name: string
  model: any
  constructor(state: any) {
    Object.assign(this, state)
    this.config = getConfig(process.env.NODE_ENV || 'development')
    this.name = ''
  }

  loadAllWithPaging(reqObj: RequesListingType) {
    const {
      page = 1, pageSize = 10,
    } = reqObj
    let url = `/auth/${this.name}?page=${page}&pageSize=${pageSize}`
    const request = parsedQuery(url, reqObj)

    return new Promise((resolve, reject) => {
      return useCustomFetch(request.url, {
        method: 'GET',
        params: request.params,
      }).then(({ data: val }) => {
        const value = val && val.value || {}
        const res = { ...value } as any
        let data = {
          records: [],
          total: 0,
          errors: null,
        }
        data.records = res && [...res.rows] || []
        data.total = res && res.total || 0
        if (res && res.message) {
          data.errors = res && res.message
        }
        resolve(data)
      }, (e) => {
        console.log(e)
        reject({ message: 'Failed to load records' })
      })
    })
  }

  save(reqObj: any) {
    let url = `/auth/${this.name}/`
    return new Promise((resolve, reject) => {
      useCustomFetch(url, {
        method: 'POST',
        body: reqObj,
      }).then(({ data: val }) => {
        const value = val && val.value || {}
        const res = { ...value } || {}
        resolve(res)
      }, (e) => {
        if (e && e.response) {
          const { data } = e.response
          if (data && data.message) {
            reject({ errors: data.message })
          }
        } else {
          console.log(e)
          reject(e)
        }
      })
    })
  }

  update(reqObj: any) {
    const { _id } = reqObj
    let url = `/auth/${this.name}/${_id}/`
    return new Promise((resolve, reject) => {
      useCustomFetch(url, {
        method: 'PUT',
        body: reqObj,
      }).then(({ data: val }) => {
        const value = val && val.value || {}
        const res = { ...value } || {}
        resolve(res)
      }, (e) => {
        reject(e)
      })
    })
  }

  getById(id: string, populates = []) {
    let url = `/auth/${this.name}/${id}`
    if (populates && populates.length > 0) {
      url += `/?populate[]=${populates[0]}`
      for (let i = 1; i < populates.length; i++) {
        url += `&populate[]=${populates[i]}`
      }
    }
    return new Promise((resolve, reject) => {
      useCustomFetch(url).then(({ data: val }) => {
        const value = val && val.value || {}
        const res = { ...value } || {}
        resolve(res)
      }, (e) => {
        console.log(e)
        reject(e)
      })
    })
  }

  create() {
    return Promise.resolve(this.model)
  }

  remove(reqObj: any) {
    const { _id } = reqObj
    let url = `/auth/${this.name}/${_id}`
    return new Promise((resolve, reject) => {
      useCustomFetch(url, {
        method: 'DELETE',
      }).then(({ data: val }) => {
        const value = val && val.value || {}
        const res = { ...value } || {}
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }
}

let parsedQuery = (url: string, reqObj: RequesListingType) => {
  const {
    status = '',
    search = '',
    searchFields = [],
    rangeKey = '',
    rangeValues = [],
    id = '',
    populates = [],
    fields = [],
    sort = '-createdAt',
  } = reqObj
  let requestUrl = url
  const params = {
    query: {} as any,
    search: '',
  }
  if (status) {
    params.query.status = status
  }
  if (search) {
    params.search = trim(search)
    if (searchFields && searchFields.length > 0) {
      requestUrl += searchFields.map(o => `&searchFields[]=${o}`).join('')
    }
  }
  if (rangeKey && rangeValues && rangeValues.length === 2) {
    params.query[rangeKey] = {
      $gte: rangeValues[0],
      $lt: rangeValues[1],
    }
  }
  if (id) {
    params.query._id = id
  }
  if (populates && populates.length > 0) {
    populates.forEach((o) => {
      requestUrl += `&populate[]=${o}`
    })
  }
  if (fields && fields.length > 0) {
    fields.forEach((o) => {
      requestUrl += `&fields[]=${o}`
    })
  }
  if (sort) {
    requestUrl += `&sort=${sort}`
  }
  return {
    url: requestUrl,
    params,
  }
}

export default BaseService