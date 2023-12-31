import apiRoutes from '../../routes/api_routes';
import { get, post, put } from '../../network/https';

export default class ForumsService {
  static async joinForum(data) {
    const response = await post({
      url: apiRoutes.joinForum,
      data: { ...data },
    });
    return response;
  }
  static async leaveForum(data) {
    const response = await post({
      url: apiRoutes.leaveForum,
      data: { ...data },
    });
    return response;
  }
  static async cancelJoinForumRequest(data) {
    const response = await post({
      url: apiRoutes.cancelJoinForumRequest,
      data: { ...data },
    });
    return response;
  }
  static async createForum(data) {
    const response = await post({
      url: apiRoutes.createForum,
      data: { ...data },
    });
    return response;
  }

  static async getAllForums(data) {
    const response = await get({
      url: apiRoutes.getAllForums,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getSuggestedForums(data) {
    const response = await get({
      url: apiRoutes.getSuggestedForums,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getForumById(data) {
    const response = await get({
      url: apiRoutes.getForumById,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getForumConnectionStatusByForumId(data) {
    const response = await get({
      url: apiRoutes.getForumConnectionStatusById,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getAllForumsByIndustry(data) {
    const response = await get({
      url: apiRoutes.getAllForumsByIndustry,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getAllForumsByLocation(data) {
    const response = await get({
      url: apiRoutes.getAllForumsByLocation,
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
