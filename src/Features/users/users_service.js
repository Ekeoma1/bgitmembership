import apiRoutes from '../../routes/api_routes';
import { get, post, put } from '../../network/https';

export default class UsersService {
  static async getUserProfileById(data) {
    const response = await get({
      url: apiRoutes.getUserProfileById,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  static async getMyProfile(data) {
    const response = await get({
      url: apiRoutes.getMyProfile,
      data: { ...data },
    });
    return response;
  }

  static async changePassword(data) {
    const response = await post({
      url: apiRoutes.changePassword,
      data: { ...data },
    });
    return response;
  }

  static async updateMyProfile(data) {
    const response = await put({
      url: apiRoutes.updateMyProfile,
      data: { ...data },
    });
    return response;
  }

  static async getFeedPreference(data) {
    const response = await get({
      url: apiRoutes.getFeedPreference,
      data: { ...data },
    });
    return response;
  }

  static async updateFeedPreference(data) {
    const response = await put({
      url: apiRoutes.updateFeedPreference,
      data: { ...data },
    });
    return response;
  }

  static async getPrivacySettings(data) {
    const response = await get({
      url: apiRoutes.getPrivacySettings,
      data: { ...data },
    });
    return response;
  }

  static async updatePrivacySettings(data) {
    const response = await put({
      url: apiRoutes.updatePrivacySettings,
      data: { ...data },
    });
    return response;
  }

  static async closeAccount(data) {
    const response = await post({
      url: apiRoutes.closeAccount,
      data: { ...data },
    });
    return response;
  }
  static async updateProfilePicture(data) {
    const response = await post({
      url: apiRoutes.updateProfilePicture,
      data: { ...data },
    });
    return response;
  }
  static async updateBackgroundPicture(data) {
    const response = await post({
      url: apiRoutes.updateBackgroundPicture,
      data: { ...data },
    });
    return response;
  }
  static async getUsers(data) {
    const response = await get({
      url: apiRoutes.getUsers,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  //   get connection status
  static async getConnectionStatusByUserId(data) {
    const response = await get({
      url: apiRoutes.getConnectionStatusByUserId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

}
