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
  //   get connection status
  static async getConnectionStatusByUserId(data) {
    const response = await post({
      url: apiRoutes.getConnectionStatusByUserId,
      data: { ...data },
    });
    return response;
  }
}
