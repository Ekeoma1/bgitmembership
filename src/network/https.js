/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
const form = new FormData();
const URL = process.env.REACT_APP_URL || '';
console.log('axios');
async function ajax({ method = 'GET', url, data }) {
  let result, contentType;
  if (data.photo) {
    contentType = 'multipart/form-data';
  } else {
    contentType = 'application/json';
  }
  const token = localStorage.getItem('token');

  if (token === 'undefined' && url !== '/Auth/Login') {
    window.location.replace('/login');
    localStorage.removeItem('token');
  } else if (url === '/Auth/Login') {
    const axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        'Content-Type': contentType,
      },
    });
    await axiosInstance({
      url,
      method,
      data,
    })
      .then((response) => {
        const { data } = response;
        result = data;
      })
      .catch((err) => {
        result = err.response?.data;
      
      });
    return result;
  } else {
    const authToken = JSON.parse(token);
    const axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${authToken}`,
      },
    });
    await axiosInstance({
      url,
      method,
      data,
    })
      .then((response) => {
        const { data } = response;
        result = data;
      })
      .catch((err) => {
        result = err.response?.data;
        if (
          err.response?.status === 401 &&
          err.response?.statusText === 'Unauthorized'
        ) {
          localStorage.removeItem('token');
          window.location.replace('/login');
        }
      });
    return result;
  }
}

// Send GET Requests
export const get = async (payload) => await ajax({ ...payload, method: 'GET' });

// Send POST Requests
export const post = async (payload) =>
  await ajax({ ...payload, method: 'POST' });

// Send Delete Requests
export const del = async (payload) =>
  await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload) => await ajax({ ...payload, method: 'PUT' });
