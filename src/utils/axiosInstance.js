import axios from 'axios'
axios.defaults.withCredentials = true
// const BASE_URL = 'http://147.93.31.52:8000/'
// const BASE_URL = 'http://localhost:8000/'
const BASE_URL = 'https://api.jishanbook.com/'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  config => {
    const cookies = document.cookie.split(';')
    console.log(document.cookie, cookies, 'cookies')
    // let token = null
    // cookies.forEach(cookie => {
    //   if (cookie.trim().startsWith('token=')) {
    //     token = cookie.split('=')[1]
    //   }
    // })
    const token = localStorage.getItem('token') // Or retrieve from cookies
    // console.log(token, 'token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('Interceptor Error:', error.response)
    return Promise.reject(error)
  }
)

export default axiosInstance
