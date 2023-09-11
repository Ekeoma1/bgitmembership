import apiRoutes from '../../routes/api_routes';
import { post } from '../../network/https';

export default class SignupService {
  static async signup(data) {
    const response = await post({
      url: apiRoutes.signup,
      data: { ...data },
    });
    if (response.status !== 'success') {
      throw new Error(response.message);
    }
    if (response.status === 'success') {
      console.log(response);
      return response.data;
    }
  }
}
