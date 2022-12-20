<template>
  <a-button type="primary" @click="showDrawer">Create Task</a-button>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Create Project"
    placement="right"
    @after-visible-change="afterVisibleChange"
    width="50%"
  >
    <FormCreateTaskVue
      :ProjectId="this.ProjectId"
      style="display: block; margin-right: 80px; margin-left: 1px"
    />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FormCreateProjectVue from "./FormCreateProject.vue";
import FormCreateTaskVue from "./FormCreateTask.vue";
export default defineComponent({
  components: { FormCreateTaskVue },
  props: {
    ProjectId: {
      type: String,
    },
  },
  setup() {
    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log("visible", bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
    };
  },
});
</script>
