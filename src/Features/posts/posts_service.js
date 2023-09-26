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

  // toggle like post
  static async toggleLikePost(data) {
    const response = await post({
      url: apiRoutes.toggleLikePost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //   get posts liked users
  static async getPostLikedUsers() {
    const response = await get({
      url: apiRoutes.getPostLikedUsers,
    });
    return response;
  }

  //   get all posts
  static async getAllPosts(data) {
    const response = await get({
      url: apiRoutes.getAllPosts,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  // get posts by user id
  static async getAllPostsByUserId() {
    const response = await get({
      url: apiRoutes.getAllPostsByUserId,
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
