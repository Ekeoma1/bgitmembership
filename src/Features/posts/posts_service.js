import apiRoutes from '../../routes/api_routes';
import { del, get, post, put } from '../../network/https';

export default class PostsService {
  //  create post
  static async createPost(data) {
    const response = await post({
      url: apiRoutes.createPost,
      data: { ...data },
    });
    return response;
  }

  // toggle like unlike post
  static async toggleLikeUnlikePost(data) {
    const response = await post({
      url: apiRoutes.toggleLikeUnlikePost,
      data: { ...data },
    });
    return response;
  }

  //   get all posts
  static async getAllPosts() {
    const response = await get({
      url: apiRoutes.getAllPosts,
    });
    return response;
  }

  // get posts by user id
  static async getPostsByUserId() {
    const response = await get({
      url: apiRoutes.getPostsByUserId,
    });
    return response;
  }

  // get my posts
  static async getMyPosts() {
    const response = await get({
      url: apiRoutes.getMyPosts,
    });
    return response;
  }

  //create comment
  static async createComment(data) {
    const response = await post({
      url: apiRoutes.createComment,
      data: { ...data },
    });
    return response;
  }
}
