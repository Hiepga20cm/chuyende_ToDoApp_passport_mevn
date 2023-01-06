<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="horizontal"
  >
    <a-sub-menu key="123">
      <template #title>
        <a-badge
          :count="checkCount(this.listNotification)"
          title="Custom hover text"
          style="margin-left: 15px; margin-bottom: 5px"
        >
          <div v-if="this.userCurrent.avatar !== ''">
            <a-avatar :src="this.userCurrent.avatar" size="small" />
          </div>
          <div v-else-if="this.userCurrent.avatar === ''">
            <a-avatar size="small">{{
              getFirstKey(this.userCurrent.lastName)
            }}</a-avatar>
          </div>
        </a-badge>
      </template>
      <a-menu-item key="2" @click="enterIconLoading">
        <template #icon>
          <SettingOutlined />
        </template>
        Logout
      </a-menu-item>
      <a-sub-menu key="sub1-2" title="Submenu">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Notification</template>
        <div v-for="n in this.listNotification.data">
          <a-menu-item :key="n._id" @click="seenStatus(n._id)">
            <a-badge
              v-if="n.status == 'NOT_CHECKED'"
              dot=" true"
              title="Custom hover text"
            >
              {{ n.description }}
            </a-badge>
            <a-badge
              v-if="n.status !== 'NOT_CHECKED'"
              title="Custom hover text"
            >
              {{ n.description }}
            </a-badge>
          </a-menu-item>
        </div>
      </a-sub-menu>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { getFirstKey } from "../hook/upFirstKey";
import router from "../router";
import noticeApi from "../api/modules/notice";

export default defineComponent({
  props: {
    userCurrent: {
      type: Object,
    },
    listNotification: {
      type: Object,
    },
  },
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  data() {
    return {
      count: undefined,
    };
  },
  methods: {
    getFirstKey,
    checkCount: function (data: any) {
      if (data.data !== undefined) {
        let count1 = 0;
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].status == "NOT_CHECKED") {
            count1++;
          }
        }
        this.count = count1;
        return this.count;
      }
    },
    async seenStatus(data: any) {
      try {
        const res: any = await noticeApi.changeStatus(data);
        console.log(res);
        if (res.success === true) {
          this.count = this.count - 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  setup(props: any, context) {
    const enterIconLoading = () => {
      localStorage.clear();
      location.reload();
      router.push({ path: "/" });
    };

    const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const handleClick: MenuProps["onClick"] = (menuInfo) => {
      console.log("click ", menuInfo);
    };
    return {
      ...toRefs(state),
      handleClick,
      enterIconLoading,
    };
  },
});
</script>
