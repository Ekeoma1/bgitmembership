import apiRoutes from '../../routes/api_routes';
import { get, post, put } from '../../network/https';

export default class ForumsService {
  static async getAllForums(data) {
    const response = await get({
      url: apiRoutes.getAllForums,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  static _getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }

  static _removeToken() {
    localStorage.removeItem('token');
  }
}
