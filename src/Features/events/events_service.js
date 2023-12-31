import apiRoutes from '../../routes/api_routes';
import { del, get, post } from '../../network/https';

export default class ForumsService {
  static async getAllEvents(data) {
    const response = await get({
      url: apiRoutes.getAllEvents,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getMyAppliedEvents(data) {
    const response = await get({
      url: apiRoutes.getMyAppliedEvents,
      data: { ...data },
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
  static async cancelEventApplication(data) {
    const response = await del({
      url: apiRoutes.cancelEventApplication,
      data: { ...data },
    });
    return response;
  }
}
