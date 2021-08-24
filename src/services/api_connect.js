import axios from 'axios'
import { decodeToken, isExpired } from 'react-jwt'

export default function apiRequest (url, config, method) {
  let axiosConfig = Object.assign({
    url: url,
    method: method ?? 'GET',
    headers: {
      Accept: 'application/json',
    },
  }, config)
  let jwt = localStorage.getItem('jwt_token')
  if (decodeToken(jwt)?.exp && !isExpired(jwt)) {
    axiosConfig.headers.Authorization = 'Bearer ' + jwt
  }
  return axios.request(axiosConfig)
}