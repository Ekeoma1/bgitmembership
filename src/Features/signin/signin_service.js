import apiRoutes from '../../routes/api_routes';
import { post } from '../../network/https';

export default class SigninService {
  static async signin(data) {
    const response = await post({
      url: apiRoutes.signin,
      data: { ...data },
    });
    return response;
  }
}
