import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'


function GetQueryString(param) {
  let reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}

if (GetQueryString('token')) {
  console.log(GetQueryString('token'))
  localStorage.setItem('TOKEN', GetQueryString('token'))
}

//
// TOKEN = 'JeWgj2ep7m4OP3HKvWu5U5ZNrV5snU2P5SbaB22xoKda/Z1SanenNRhDH1snr2d7GBEgUK2317CVRF3MaKYacWNqqgl7TIV8ke8+mDbhRD7IyXG5cBo9a1yo4vJhncR7'
// uuid = '060130abb85f2b39c6e69d3b29d0062e37e317dc'
// phoneModel = 'iphone'
// clientId = '6df8179dd64900afc5c58931a0718e15'
// localStorage.setItem('TOKEN', TOKEN)
// localStorage.setItem('appVersion', appVersion)
// localStorage.setItem('uuid', uuid)
// localStorage.setItem('clientId', clientId)
// localStorage.setItem('userId', userId)

let TOKEN = localStorage.getItem('TOKEN')
let appVersion = localStorage.getItem('appVersion')
let uuid = localStorage.getItem('uuid')
let clientId = localStorage.getItem('clientId')

console.log(localStorage.getItem('appVersion'), 'appVersion')
console.log(localStorage.getItem('TOKEN'), 'TOKEN')
console.log(localStorage.getItem('uuid'), 'uuid')
console.log(localStorage.getItem('clientId'), 'clientId')
console.log(localStorage.getItem('userId'), 'userId')


// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
let sUserAgent = navigator.userAgent.toLowerCase()
let bIsAndroid = sUserAgent.match(/android/i) == 'android'
let bIsIphoneOs = sUserAgent.match(/iphone/i) == 'iphone'
let SYSTEM = ''

if (window.__wxjs_environment == 'miniprogram') {
  SYSTEM = 'min-program'
} else {
  if (bIsAndroid) {
    SYSTEM = 'android'
  } else if (bIsIphoneOs && window.__wxjs_environment !== 'miniprogram') {
    SYSTEM = 'ios'
  }
}
// SYSTEM = 'min-program'

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({ forbidClick: true })
    }
    console.log(TOKEN, '=======')
    if (!TOKEN) {
      return false
    }
    if (TOKEN) {
      config.headers['SANGUOSHA-TOKEN'] = TOKEN;
      config.headers['APP-SYSTEM'] = SYSTEM;
      config.headers['DEVICE-ID'] = uuid || '';
      config.headers['APP-VERSION'] = appVersion || '';
      config.headers['GETUI-CLIENT-ID'] = clientId || '';
    }
    if (window.__wxjs_environment == 'miniprogram') {
      config.headers['Authorization'] = `${TOKEN}`
    }

    // config.headers['sanguosha-token'] = 'EfNCEghBiOd6VU9gAKCnvJLprbEU1AbQsst/t2NV/IavGVwQzLAqEJReq82imKcpgjyPV23dDSWa0k5ii+2tyA++yL4tJvuBKD5onbcUg3UK+bTDB3AsWzMP1StKrI+W'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    console.log(response)
    Toast.clear()
    let { ip } = response.headers
    localStorage.setItem('ip', ip)
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        Toast('系统繁忙，退出重进！')
        store.dispatch('FedLogOut').then(() => {
          // location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log(error.response) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Toast(error.response.data.message || '登录失效，退出重进')
      }
    }
    return Promise.reject(error)
  }
)

export default service
