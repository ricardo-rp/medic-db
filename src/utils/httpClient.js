import axios from 'axios';

const URL = 'https://mockend.com/org/medic-db/';

export default axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: { 'Access-Control-Allow-Origin': '*' }
});
