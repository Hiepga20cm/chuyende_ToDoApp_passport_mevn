<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="2">nav 2</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="project in pro" :key="project.Name">
            <template #title>
              <span @click="setDetailProject(project)">
                <user-outlined />
                {{ project.Name }}
              </span>
            </template>
            <a-menu-item v-for="p in project.TaskList">{{
              p.Name
            }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <ProjectDetail :projectDetail="this.pr" />
          <Tabs :projectDetail="this.pr" />
        </a-layout-content>
      </a-layout>
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

  setup() {
    const pro: any = ref({});
    const getAllProject = async () => {
      try {
        //this.isLoading = true;
        const res = await projectApi.getAllProject();
        //this.isLoading = false;

        pro.value = res?.data;
        console.log(pro.value);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProject();
    return {
      pro,
      selectedKeys1: ref<string[]>(["2"]),
      selectedKeys2: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(["sub1"]),
    };
  },
  methods: {
    async setDetailProject(project: any) {
      try {
        console.log(project);
        this.pr = project;
        console.log(this.pr);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
