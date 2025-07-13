import axios from 'axios';

const configForRequest = { baseURL: 'http://localhost:5001' };
const configForLocalhostRequest = { baseURL: 'http://localhost:5001'}

export const axiosInstance = axios.create(configForRequest);
export const localhostInstance = axios.create(configForLocalhostRequest);

export const updateInstanceHeaders = headers => {
   Object.assign(axiosInstance.defaults, {headers});
   Object.assign(localhostInstance.defaults, { headers });
}
