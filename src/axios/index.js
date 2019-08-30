import axios from 'axios';
import {ENDPOINT} from '../config';

const instance = axios.create({
  baseURL: ENDPOINT,
});

instance.interceptors.request.use(request => {
  console.log(request);
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default instance;
