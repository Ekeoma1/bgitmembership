import axios from 'axios';
// const URL = process.env.REACT_APP_URL || '';
// export const axiosInstance = axios.create({
//   baseURL: URL,
//   headers: { 'Content-Type': 'application/json' },
// });
// // Send HTTP Request
// async function ajax({
//   method = 'GET',
//   url,
//   data,
//   baseURL,
//   headers = {},
//   before = () => {},
//   after = () => {},
//   mutate = false,
//   success = () => {},
//   error = () => {},
//   serverError = false,
//   formErrors = true,
//   axiosProps = {},
// }) {
//   let result = {
//     message: '',
//     data: '',
//     status: '',
//     error: '',
//   };
//   // Call Before Function
//   before();

//   // Send Request
//   await axiosInstance({
//     // Request URL
//     url,
//     // Request Method
//     method,
//     // To overwrite incase
//     baseURL,
//     // Post Data
//     data,
//     // Request Headers
//     headers,
//     // Axios Specific Properties
//     ...axiosProps,
//   })
//     .then((response) => {
//       console.log('response', response);

//       result = response;
//       // if (result.status !== 'success') {
//       //   throw new Error(`${result.status} ${result.message}`);
//       // }
//     })
//     .catch((err) => {
//       // Assign Response Error
//       result.error = true;
//       result.message = err.message;
//       result.status = err.status;
//     });

//   return result;
// }

const ajax = async (params) => {
  // try {
  //   const data = await axios.post(
  //     'http://biodundrizzle-001-site1.atempurl.com/api/Auth/SignUp',{body:}
  //   );

  // } catch (error) {}
  console.log('params http file', params.data);
  axios({
    method: 'post',
    url: 'http://biodundrizzle-001-site1.atempurl.com/api/Auth/SignUp',
    data: params.data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(function (response) {
      //handle success
      console.log('response http file', response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

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
