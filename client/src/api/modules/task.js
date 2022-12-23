import { async } from "rxjs";
import axiosClient from "../index";
const taskApi = {
  CreateTask: async (ProjectId, data) => {
    try {
      console.log(ProjectId, data);
      const url = `/tasks/newTask/${ProjectId}`;
      return axiosClient.post(url, data);
    } catch (error) {
      console.log(error);
    }
  },
  DeleteTask: async (TaskId) => {
    try {
      const url = `/tasks/deleteTask/${TaskId}`;
      return axiosClient.delete(url);
    } catch (error) {
      console.log(error);
    }
  },
  EditTask: async (TaskId, data) => {
    try {
      const url = `/tasks/editTask/${TaskId}`;
      return axiosClient.patch(url, data);
    } catch (error) {
      console.log(error);
    }
  },
};
export default taskApi;
