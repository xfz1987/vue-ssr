import request from 'axios'

const hostMaps = {
  'development': 'http://localhost:8081',
  'production': 'http://localhost:80',
}

const ENV = process.env.NODE_ENV || 'development'

request.defaults.baseURL = hostMaps[ENV]

export const getTopics = ({ commit }) => {
  return request.get('/api/getCity').then((response) => {
    if (response.statusText === 'OK') {
      commit('TOPICS_LIST', response.data)
    }
  }).catch((error) => {
    console.log(error)
  })
}

export const increment = ({ commit }) => commit('INCREMENT')
export const decrement = ({ commit }) => commit('DECREMENT')
