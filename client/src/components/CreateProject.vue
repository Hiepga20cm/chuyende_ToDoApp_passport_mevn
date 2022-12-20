<template>
  <a-button type="primary" @click="showDrawer">Create Project</a-button>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Create Project"
    placement="right"
    @after-visible-change="afterVisibleChange"
    width="50%"
  >
    <FormCreateProjectVue
      style="display: block; margin-right: 80px; margin-left: 1px"
    />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FormCreateProjectVue from "./FormCreateProject.vue";
export default defineComponent({
  components: { FormCreateProjectVue },
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
