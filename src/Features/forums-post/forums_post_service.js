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
  static async getForumPostsByForumId(data) {
    const response = await get({
      url: apiRoutes.getForumPostsByForumId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  // createComment
  static async createComment(data) {
    const response = await post({
      url: apiRoutes.createCommentForumsPost,
      data: { ...data },
    });
    return response;
  }

  // replyComment
  static async replyComment(data) {
    const response = await post({
      url: apiRoutes.replyCommentForumsPost,
      data: { ...data },
    });
    return response;
  }

  //like reply
  static async likeReply(data) {
    const response = await post({
      url: apiRoutes.likeReplyForumsPost,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //unlike reply
  static async unlikeReply(data) {
    const response = await post({
      url: apiRoutes.unlikeReplyForumsPost,
      data: { ...data },
      queryParams: data.queryParams,
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
