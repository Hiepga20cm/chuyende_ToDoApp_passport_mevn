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
};
export default taskApi;
