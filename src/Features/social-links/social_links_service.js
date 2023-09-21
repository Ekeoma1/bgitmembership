import apiRoutes from '../../routes/api_routes';
import { del, get, post } from '../../network/https';

export default class SocialLinksService {
  static async addSocialLinks(data) {
    const response = await post({
      url: apiRoutes.addSocialLinks,
      data: { ...data },
    });
    return response;
  }

  static async getSocialLinks(data) {
    const response = await get({
      url: apiRoutes.getSocialLinks,
      data: { ...data },
    });
    return response;
  }

  static async updateSocialLinks(data) {
    const response = await post({
      url: apiRoutes.updateSocialLinks,
      data: { ...data },
    });
    return response;
  }

  static async deleteSocialLink(data) {
    const response = await del({
      url: apiRoutes.deleteSocialLink,
      data: { ...data },
    });
    return response;
  }
}
