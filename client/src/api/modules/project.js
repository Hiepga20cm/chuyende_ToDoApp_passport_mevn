import axiosClient from "../index";

const projectApi = {
  getAllProject: async () => {
    try {
      const url = "/projects/projectList";
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  newProject: async (data) => {
    try {
      const url = "/projects/newProject";
      return axiosClient.post(url,  data );
    } catch (error) {
      console.log(error);
    }
  },
};

export default projectApi;
