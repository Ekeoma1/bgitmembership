import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class PostsService {
  //  create post
  static async createPost(data) {
    const response = await post({
      url: apiRoutes.createPost,
      data: { ...data },
    });
    return response;
  }

  // like post
  static async likePost(data) {
    const response = await post({
      url: apiRoutes.likePost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  // unlike post
  static async unlikePost(data) {
    const response = await post({
      url: apiRoutes.unlikePost,
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
  static async getAllPostsByUserId(data) {
    const response = await get({
      url: apiRoutes.getAllPostsByUserId,
      data: { ...data },
      queryParams: data.queryParams,
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

  //reply comment
  static async replyComment(data) {
    const response = await post({
      url: apiRoutes.replyComment,
      data: { ...data },
    });
    return response;
  }

  //like comment
  static async likeComment(data) {
    const response = await post({
      url: apiRoutes.likeComment,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //unlike comment
  static async unlikeComment(data) {
    const response = await post({
      url: apiRoutes.unlikeComment,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //like reply
  static async likeReply(data) {
    const response = await post({
      url: apiRoutes.likeReply,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //unlike reply
  static async unlikeReply(data) {
    const response = await post({
      url: apiRoutes.unlikReply,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //get all comments by post id
  static async getCommentsByPostId(data) {
    const response = await get({
      url: apiRoutes.getCommentsByPostId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //save posts
  static async savePost(data) {
    const response = await post({
      url: apiRoutes.savePost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  // unsave posts
  static async unsavePost(data) {
    const response = await post({
      url: apiRoutes.unsavePost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
}
