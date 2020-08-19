import axios from 'axios';
const API_URL = 'http://localhost:3001/api';

const connector = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'access-token': localStorage.getItem('accessToken'),
  },
});
export default connector;
