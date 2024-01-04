import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class PostsService {
  //  create forum post
  static async createForumPost(data) {
    const response = await post({
      url: apiRoutes.createForumPost,
      data: { ...data },
    });
    return response;
  }

  // like forum post
  static async likeForumPost(data) {
    const response = await post({
      url: apiRoutes.likeForumPost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
  // unlike forum  post
  static async unlikeForumPost(data) {
    const response = await post({
      url: apiRoutes.unlikeForumPost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //  getForumPostsByForumId
  static async getForumPostsByForumId() {
    const response = await get({
      url: apiRoutes.getForumPostsByForumId,
    });
    return response;
  }

  // createComment
  static async createComment(data) {
    const response = await get({
      url: apiRoutes.createComment,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  // replyComment
  static async replyComment() {
    const response = await get({
      url: apiRoutes.replyComment,
    });
    return response;
  }

  //like reply
  static async likeReply(data) {
    const response = await post({
      url: apiRoutes.likeReply,
      data: { ...data },
    });
    return response;
  }

  //unlike reply
  static async unlikeReply(data) {
    const response = await post({
      url: apiRoutes.unlikeReply,
      data: { ...data },
    });
    return response;
  }

  //likeForumPostComment
  static async likeForumPostComment(data) {
    const response = await post({
      url: apiRoutes.likeForumPostComment,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //unlikeForumPostComment
  static async unlikeForumPostComment(data) {
    const response = await post({
      url: apiRoutes.unlikeForumPostComment,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //saveForumPost
  static async saveForumPost(data) {
    const response = await post({
      url: apiRoutes.saveForumPost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //unsaveForumPost
  static async unsaveForumPost(data) {
    const response = await post({
      url: apiRoutes.unsaveForumPost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //getAllCommentsByForumPostId
  static async getAllCommentsByForumPostId(data) {
    const response = await get({
      url: apiRoutes.getAllCommentsByForumPostId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }
}
