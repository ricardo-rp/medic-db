import axios from 'axios';

const URL = 'http://localhost:4300';

export default axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
});
