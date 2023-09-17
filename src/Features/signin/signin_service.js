import apiRoutes from '../../routes/api_routes';
import { post } from '../../network/https';

export default class SigninService {
  static async signin(data) {
    const response = await post({
      url: apiRoutes.signin,
      data: { ...data },
    });
    if (response.status !== 'success') {
      throw new Error(response.message);
    }
    if (response.status === 'success') {
      return response.data;
    }
  }
}
