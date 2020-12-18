import axios from 'axios';

const URL = 'https://my.api.mockaroo.com/';

export default axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-API-Key': '38effba0'
  }
});
