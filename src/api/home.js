import api from './index'
// axios
import request from '@/utils/request'
import axios from 'axios'


export function annualReportData(params = {}) {
  return request({
    url: api.annualReportData,
    method: 'get',
    params
  })
}


export function annualReport(params) {
  return request({
    url: api.annualReport,
    method: 'get',
    params
  })
}


export function postData(eventsId) {
  // 魔方数据上报
  let data = {
    app_id: '205_209',
    is_server: false,
    events: [
      {
        'id': eventsId,
        'label': '',
        'start_time': Math.round(new Date().getTime() / 1000),
        'device_id': localStorage.getItem('clientId') || '',
        'os_type': 13,
        'ip': localStorage.getItem('ip'),
        'channel': '',
        'app_version': '',
        'parameters': {
          'ad_channel': 'channel'
        },
        'deviceProfile': []
      }
    ]
  }
  axios.post('https://ykdc.hzyoka.com/bfrd/json', data).then(function(response) {
    console.log(response)
  }).catch(function(error) {
    console.log(error)
  })
}





