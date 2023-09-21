import apiRoutes from '../../routes/api_routes';
import { del, get, post, put } from '../../network/https';

export default class JobsService {
  //  add job
  static async addJob(data) {
    const response = await post({
      url: apiRoutes.addJob,
      data: { ...data },
    });
    return response;
  }

  //  edit job
  static async editJob(data) {
    const response = await put({
      url: apiRoutes.editJob,
      data: { ...data },
    });
    return response;
  }

  //   get all jobs
  static async getAllJobs() {
    const response = await get({
      url: apiRoutes.getAllJobs,
    });
    return response;
  }

  // get all inactive jobs
  static async getAllInactiveJobs() {
    const response = await get({
      url: apiRoutes.getAllInactiveJobs,
    });
    return response;
  }

  // get all closed jobs
  static async getAllClosedJobs() {
    const response = await get({
      url: apiRoutes.getAllClosedJobs,
    });
    return response;
  }

  //delete job
  static async deleteJob(data) {
    const response = await del({
      url: apiRoutes.deleteJob,
      data: { ...data },
    });
    return response;
  }
}
