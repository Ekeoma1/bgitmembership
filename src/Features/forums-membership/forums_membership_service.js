import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class ConnectionsService {
  //  accept forum join requests
  static async acceptForumJoinRequest(data) {
    const response = await post({
      url: apiRoutes.acceptForumJoinRequest,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  //  reject forum join requests
  static async rejectForumJoinRequest(data) {
    const response = await post({
      url: apiRoutes.rejectForumJoinRequest,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  //  get pending join requests by forum id
  static async getPendingJoinRequestsByForumId(data) {
    const response = await get({
      url: apiRoutes.getPendingJoinRequestsByForumId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  //  accept pending join requests
  static async getPendingJoinRequests(data) {
    const response = await get({
      url: apiRoutes.getPendingJoinRequests,
      data: { ...data },
    });
    return response;
  }
  //  get forum members by forum id
  static async getForumMembersByForumId(data) {
    const response = await get({
      url: apiRoutes.getForumMembersByForumId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
}
