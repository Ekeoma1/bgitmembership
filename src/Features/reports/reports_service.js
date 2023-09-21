import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class ReportsService {
  static async reportUser(data) {
    const response = await post({
      url: apiRoutes.reportUser,
      data: { ...data },
    });
    return response;
  }

  static async getAllReports(data) {
    const response = await get({
      url: apiRoutes.getAllReports,
      data: { ...data },
    });
    return response;
  }
}
