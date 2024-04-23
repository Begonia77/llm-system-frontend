import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

instance.interceptors.request.use((config) => {
  config.url = '/llm'
  return config
})

export function postLlmFeature(data) {
  return instance.post('', data)
}
