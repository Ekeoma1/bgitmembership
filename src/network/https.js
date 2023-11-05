import axios from 'axios';
const URL = process.env.REACT_APP_URL || '';
// console.log('axios');

async function ajax({ method = 'GET', url, data, queryParams }) {
  console.log('data ', data);
  // console.log('query ', queryParams);
  let result, contentType;
  if (
    data?.photo ||
    data?.postImageUrl ||
    data?.postVideoUrl ||
    data?.content ||
    data?.resume
  ) {
    contentType = 'multipart/form-data';
  } else {
    contentType = 'application/json';
  }
  if (url === '/Auth/Login' || url === '/Auth/SignUp') {
    // console.log('login in or signing up requests');
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
        console.log('error here');
        result = err.response?.data;
      });
    return result;
  } else {
    const token = localStorage.getItem('token');
    const authToken = JSON.parse(token);
    const currentToken = JSON.parse(atob(token.split('.')[1]));
    // console.log('token', currentToken);
    const expiredDate = new Date(currentToken.exp * 1000);
    let currentDate = new Date();
    if (expiredDate < currentDate) {
      window.location.replace('/login');
      localStorage.removeItem('token');
      // console.log('token expired');
    } else {
      // console.log('normal requests');
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
        params: queryParams,
      })
        .then((response) => {
          const { data } = response;
          result = data;
        })
        .catch((err) => {
          console.log('axios errp', err);
          result = err.response?.data;
        });
      return result;
    }
  }
}

// Send GET Requests
export const get = async (payload) => await ajax({ ...payload, method: 'GET' });

// Send POST Requests
export const post = async (payload) => {
  console.log('payload', payload);
  return await ajax({ ...payload, method: 'POST' });
};

// Send Delete Requests
export const del = async (payload) =>
  await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload) => await ajax({ ...payload, method: 'PUT' });
