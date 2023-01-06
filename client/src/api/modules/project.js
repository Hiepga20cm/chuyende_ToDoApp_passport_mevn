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
      return axiosClient.post(url, data);
    } catch (error) {
      console.log(error);
    }
  },
  editProject: async (idProject, data) => {
    try {
      const url = `/projects/editProject/${idProject}`;
      return axiosClient.put(url, data);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (projectId) => {
    try {
      console.log(projectId);
      const url = `/projects/deleteProject/${projectId}`;
      return axiosClient.delete(url);
    } catch (error) {
      console.log(error);
    }
  },
  getProjectById: async (projectId) => {
    try {
      const url = `/projects/getProjectById/${projectId}`;
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  getCollabotor: async (projectId) => {
    try {
      const url = `projects/getCollaborator/${projectId}`;
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default projectApi;
