import apiRoutes from '../../routes/api_routes';
import { get, put } from '../../network/https';

export default class AccountPrivaciesService {
  //   get blocked users
  static async getBlockedUsers(data) {
    const response = await get({
      url: apiRoutes.getBlockedUsers,
      data: { ...data },
    });
    return response;
  }

  //   block user
  static async blockUser(data) {
    const response = await put({
      url: apiRoutes.blockUser,
      data: { ...data },
    });
    return response;
  }

  // unblock user
  static async unblockUser(data) {
    const response = await put({
      url: apiRoutes.unblockUser,
      data: { ...data },
    });
    return response;
  }

  // mute user
  static async muteUser(data) {
    const response = await put({
      url: apiRoutes.muteUser,
      data: { ...data },
    });
    return response;
  }

  // unmute user
  static async unmuteUser(data) {
    const response = await put({
      url: apiRoutes.unmuteUser,
      data: { ...data },
    });
    return response;
  }
}
