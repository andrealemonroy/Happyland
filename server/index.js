/* eslint-disable */
var axios = require('axios');
var localStorage = require('localStorage');
let api = axios.create({
  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  // baseURL: process.env.API_LOCATION,
  baseURL: `${process.env.NUXT_ENV_API_URL}`,
  // `headers` are custom headers to be sent
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'Authorization': localStorage.getItem('Auth')
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 40000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000000,

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 3, // default


});

const baseApi = () => {
  return `${process.env.NUXT_ENV_API_URL}/${process.env.NUXT_ENV_API_VERSION}`
}

export const registerParent = async (parentInfo) => {
  try {
    const res = await api.post('http://localhost:5000/api/v1/fathers/register', parentInfo)
    Object.assign(api.defaults, { headers: { Authorization: res.data.id } })
    return res
  } catch (error) {
    return error
  }
}

export const updateParent = async (id, form) => {
  return await api.put(`/fathers/${id}`, form)
}

export const registerChildToParent = async (data, profileId) => {
  const newChild = {
    child: data._id,
    names: data.names,
    surname: data.surname,
    relative: data.relative
  }
  return await api.post(`/fathers/child/${profileId}`, newChild)
}

export const registerChild = async (child) => {
  return await api.post('/childs/register', child)
}

export const getFatherByEmail = async (email) => {
  const parentEmail = { "email": email }
  console.log(parentEmail)
  return await api.post('/fathers/email/findByEmail', parentEmail)
}
export const getFatherById = async (id) => {
  let res = null
  await api.get(`/fathers/${id}`).then(function (rs) {
    res = rs
  })
  return res
}

export const deleteChild = async (idCHild) => {
  const endpoint = `http://localhost:5000/api/v1/childs/${idCHild}`
  return await api.delete(endpoint)
}

export const sendEmail = async (email, random) => {
  const dataEmail = {
    email: email.toString(),
    message: random.toString()
  }
  return await api.post(`/fathers/sendEmail`, dataEmail)
}

export default api
