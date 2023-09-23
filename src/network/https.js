/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import useLogout from '../hooks/useLogout';
const URL = process.env.REACT_APP_URL || '';

async function ajax({ method = 'GET', url, data }) {
  let result, contentType;
  if (data.photo) {
    contentType = 'multipart/form-data';
  } else {
    contentType = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token !== 'undefined') {
    const authToken = JSON.parse(token);
    const axiosInstance = axios.create({
      baseURL: URL,
      // timeout: 5000, // Set a timeout if needed
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
        result = 'error';
        if (
          err.response?.status === 401 &&
          err.response?.statusText === 'Unauthorized'
        ) {
          localStorage.removeItem('token');
          window.location.replace('/login');
        }
      });
    return result;
  } else {
    window.location.replace('/login');
    localStorage.removeItem('token');
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
