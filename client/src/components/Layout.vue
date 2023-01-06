<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
    >
      <a-modal
        v-model:visible="visible"
        title="Profile"
        @ok="handleOk"
        width="680px"
      >
        <div style="display: block; text-align: center">
          <div v-if="this.userCurrent.avatar !== ''">
            <a-avatar :size="64" :src="this.userCurrent.avatar" />
          </div>
          <div v-else-if="this.userCurrent.avatar === ''">
            <a-avatar :size="64">{{
              getFirstKey(this.userCurrent.lastName)
            }}</a-avatar>
          </div>
          <span>{{ this.userCurrent.email }}</span
          ><br />
          <span>{{ this.userCurrent.createdAt }}</span>
        </div>
        <div
          style="display: block"
          v-if="
            this.userCurrent.authGoogleID == null &&
            this.userCurrent.authFacebookID == null
          "
        >
          <FormChangePasswordVue :userId="this.userCurrent._id" />
        </div>
      </a-modal>

      <div style="display: inline-block">
        <div
          style="
            color: azure;
            font-weight: 900;
            font-size: 20px;
            margin-left: 30px;
            margin-top: 10px;
          "
        >
          Projects
        </div>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        v-for="project in pro"
        :key="project.Name"
      >
        <a-menu-item :key="project.Name" @click="setDetailProject(project)">
          <team-outlined />
          <span class="nav-text">{{ project.Name }} </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 10px;
          "
        >
          <CreateProject @update="addProject($event)" style="padding: 10px" />

          <div style="display: block; margin-left: 30px" @click="showModal">
            <Menu
              :userCurrent="this.userCurrent"
              :listNotification="this.listNotification"
            />
          </div>
        </div>
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <ProjectDetail
            :projectDetail="this.pr"
            @update1="updateProjectDetail($event)"
            @deleteProject="deleteProject($event)"
          />
          <Tabs :projectDetail="this.pr" />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import ProjectDetail from "../components/ProjectDetail.vue";
import Tabs from "../components/Tabs.vue";
import projectApi from "../api/modules/project";
import CreateProject from "./CreateProject.vue";
import { defineComponent, ref } from "vue";
import { PoweroffOutlined } from "@ant-design/icons-vue";
import Menu from "./Menu.vue";
import router from "../router";
import FormChangePasswordVue from "./FormChangePassword.vue";
interface DelayLoading {
  delay: number;
}
import {
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";
import userApi from "../api/modules/user";
import { getFirstKey } from "../hook/upFirstKey";
import noticeApi from "../api/modules/notice";

export default defineComponent({
  components: {
    FormChangePasswordVue,
    Menu,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    ProjectDetail,
    Tabs,
    CreateProject,
  },
  data() {
    return {
      items: [{ message: "Foo" }, { message: "Bar" }],
      isLoading: false,
      projects: {},
      pr: {},
      //userCurrent: {},
    };
  },

  setup(props, context) {
    const iconLoading = ref<boolean | DelayLoading>(false);

    const enterIconLoading = () => {
      iconLoading.value = { delay: 1000 };

      setTimeout(() => {
        iconLoading.value = false;
      }, 6000);

      localStorage.clear();
      location.reload();
      router.push({ path: "/" });
    };
    const pro: any = ref({});
    const userCurrent: any = ref({});
    const listNotification: any = ref({});
    // const avatar: any = null;
    const getAllProject = async () => {
      try {
        const res = await projectApi.getAllProject();

        pro.value = res?.data;
      } catch (error) {
        console.log(error);
      }
    };
    const getUserCurrent = async () => {
      try {
        const res = await userApi.getUserCurrent();
        userCurrent.value = res;
        const listNotice = await noticeApi.getNotificationByUserId(
          userCurrent.value._id
        );
        listNotification.value = listNotice;
      } catch (error) {
        console.log(error);
      }
    };

    getAllProject();
    getUserCurrent();
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
      loading: ref(false),
      iconLoading,
      enterIconLoading,
      pro,
      listNotification,
      userCurrent,
      selectedKeys: ref<string[]>(["4"]),
      selectedKeys1: ref<string[]>(["2"]),
      selectedKeys2: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(["sub1"]),
    };
  },
  methods: {
    test1() {
      console.log("test1");
    },
    async setDetailProject(project: any) {
      try {
        this.pr = project;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProjectDetail(data: any) {
      try {
        this.pr.TaskList.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    async addProject(data: any) {
      try {
        this.pro.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProject(data: any) {
      try {
        for (let i = 0; i < this.pro.length; i++) {
          if (this.pro[i]._id == data) {
            this.pro.splice(i, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    getFirstKey,
  },
});
</script>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
