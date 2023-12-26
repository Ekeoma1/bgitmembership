import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class NotificationsService {
  //  getall notifications
  static async getAllNotifications(data) {
    const response = await get({
      url: apiRoutes.getAllNotifications,
      data: { ...data },
    });
    return response;
  }
  //  get unread notification count
  static async getUnreadNotificationCount(data) {
    const response = await get({
      url: apiRoutes.getUnreadNotificationCount,
      data: { ...data },
    });
    return response;
  }
  //  get pending request count
  static async getPendingRequestCount(data) {
    const response = await get({
      url: apiRoutes.getPendingRequestCount,
      data: { ...data },
    });
    return response;
  }
}
