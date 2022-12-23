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
      <!-- <div class="logo" /> -->
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
            padding: 20px;
          "
        >
          <CreateProject @update="addProject($event)" />
          <a-button
            style="display: block; margin-left: 30px"
            type="primary"
            :loading="iconLoading"
            @click="enterIconLoading"
          >
            <template #icon style="width: 100%"> </template>
            Logout
          </a-button>
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
import router from "../router";
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
export default defineComponent({
  components: {
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
    const getAllProject = async () => {
      try {
        const res = await projectApi.getAllProject();

        pro.value = res?.data;
      } catch (error) {
        console.log(error);
      }
    };
    getAllProject();
    return {
      loading: ref(false),
      iconLoading,
      enterIconLoading,
      pro,
      selectedKeys: ref<string[]>(["4"]),
      selectedKeys1: ref<string[]>(["2"]),
      selectedKeys2: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(["sub1"]),
    };
  },
  methods: {
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
