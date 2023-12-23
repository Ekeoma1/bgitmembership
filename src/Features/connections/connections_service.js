import apiRoutes from '../../routes/api_routes';
import { get, post } from '../../network/https';

export default class ConnectionsService {
  //  get accepted connections
  static async getAcceptedConnections(data) {
    const response = await get({
      url: apiRoutes.getAcceptedConnections,
      data: { ...data },
    });
    return response;
  }
  //  get accepted connections
  static async getConnectionsByUserId(data) {
    const response = await get({
      url: apiRoutes.getConnectionsByUserId,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //  get sent rejected requests
  static async getSentRejectedRequests(data) {
    const response = await get({
      url: apiRoutes.getSentRejectedRequests,
      data: { ...data },
    });
    return response;
  }

  //   get potential connections
  static async getPotentialConnections(data) {
    const response = await get({
      url: apiRoutes.getPotentialConnections,
      data: { ...data },
    });
    return response;
  }

  //  send connection request
  static async sendConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.sendConnectionRequest,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //  camcel connection request
  static async cancelConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.cancelConnectionRequest,
      data: { ...data },
      queryParams: data.queryParams,
    });
    return response;
  }

  //   get pending request connections
  static async getPendingRequestConnections(data) {
    const response = await get({
      url: apiRoutes.getPendingRequestConnections,
      data: { ...data },
    });
    return response;
  }

  // accept connection request
  static async acceptConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.acceptConnectionRequest,
      data: { ...data },
    });
    return response;
  }

  //   reject connection request
  static async rejectConnectionRequest(data) {
    const response = await post({
      url: apiRoutes.rejectConnectionRequest,
      data: { ...data },
    });
    return response;
  }

  //   remove connection
  static async removeConnection(data) {
    const response = await post({
      url: apiRoutes.removeConnection,
      data: { ...data },
    });
    return response;
  }
}
