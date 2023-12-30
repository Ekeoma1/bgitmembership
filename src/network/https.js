import axios from 'axios';
// const URL =
//   process.env.REACT_APP_NODE_ENV === 'development'
//     ? process.env.REACT_APP_URL
//     : process.env.REACT_APP_URL_PROD;
const URL = process.env.REACT_APP_URL ?? '';
// console.log('stage', process.env.REACT_APP_NODE_ENV);

async function ajax({ method = 'GET', url, data, queryParams }) {
  // console.log('query##### ', queryParams);

  // console.log('data http ', data);
  let result, contentType;
  if (
    data?.photo ||
    data?.postImageUrl ||
    data?.postVideoUrl ||
    data?.content ||
    data?.resume ||
    data?.profilePicture ||
    data?.backgroundImage ||
    data?.CoverLetter
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
        // console.log('response http', response);
        const { data } = response;
        result = data;
      })
      .catch((err) => {
        // console.log('error here', err);
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
          // console.log('response http############', response);
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
  return await ajax({ ...payload, method: 'POST' });
};

// Send Delete Requests
export const del = async (payload) =>
  await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload) => await ajax({ ...payload, method: 'PUT' });
