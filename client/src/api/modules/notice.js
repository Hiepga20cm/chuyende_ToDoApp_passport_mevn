import axiosClient from "../index";

const noticeApi = {
  getNotificationByUserId: async (userId) => {
    try {
      const url = `/notices/getNoticeByUserId/${userId}`;
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
  changeStatus: async (noticeId) => {
    try {
      const url = `/notices/changeStatus/${noticeId}`;
      return axiosClient.patch(url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default noticeApi;
