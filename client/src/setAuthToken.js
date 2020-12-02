import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3001'
})


const setAuthToken = (token) => {
  if (token) {
    server.defaults.headers.common.Authorization = token;
  } else {
    delete server.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;