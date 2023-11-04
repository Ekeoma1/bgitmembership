import apiRoutes from '../../routes/api_routes';
import { get } from '../../network/https';

export default class NewsService {
  static async getAllNews(data) {
    const response = await get({
      url: apiRoutes.getAllNews,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  static async getNewsById(data) {
    const response = await get({
      url: apiRoutes.getNewsById,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
}
