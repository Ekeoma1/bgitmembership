import apiRoutes from '../../routes/api_routes';
import { get, post, put } from '../../network/https';

export default class AuthService {
  //  get accepted connections
  static async getAcceptedConnections(data) {
    const response = await get({
      url: apiRoutes.getAcceptedConnections,
      data: { ...data },
    });
    return response;
  }

  //  get sent rejected requests
  static async getSentRejectedRequests(data) {
    const response = await get({
      url: apiRoutes.getSentRejectedRequests,
      data: { ...data },
    });
    return response;
  }

  //   get potential connections
  static async getPotentialConnections(data) {
    const response = await get({
      url: apiRoutes.getPotentialConnections,
      data: { ...data },
    });
    return response;
  }

  //  send connection request
  static async sendConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.sendConnectionRequest,
      data: { ...data },
    });
    return response;
  }

  //   get pending request connections
  static async getPendingRequestConnections(data) {
    const response = await get({
      url: apiRoutes.getPendingRequestConnections,
      data: { ...data },
    });
    return response;
  }

  // accept connection request
  static async acceptConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.acceptConnectionRequest,
      data: { ...data },
    });
    return response;
  }

  //   reject connection request
  static async rejectConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.rejectConnectionRequest,
      data: { ...data },
    });
    return response;
  }

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
