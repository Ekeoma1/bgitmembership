import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class ForumsService {
  static async getAllEvents(data) {
    const response = await get({
      url: apiRoutes.getAllEvents,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getEventById(data) {
    const response = await get({
      url: apiRoutes.getEventById,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async applyForEvent(data) {
    const response = await post({
      url: apiRoutes.applyForEvent,
      data: { ...data },
    });
    return response;
  }
}
