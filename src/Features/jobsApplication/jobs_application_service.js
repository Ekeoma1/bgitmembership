import apiRoutes from '../../routes/api_routes';
import { post } from '../../network/https';

export default class JobsApplicationService {
  static async applyForJob(data) {
    const response = await post({
      url: apiRoutes.applyForJob,
      data: { ...data },
    });
    return response;
  }
}
