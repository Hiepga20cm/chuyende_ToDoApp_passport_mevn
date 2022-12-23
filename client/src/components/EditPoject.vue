<template>
  <a-button type="primary" @click="showDrawer">Edit Project</a-button>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Edit Project"
    placement="right"
    @after-visible-change="afterVisibleChange"
    width="50%"
    destroyOnClose
  >
    <FormEditProjectVue
      :projectDetail="this.projectDetail"
      style="display: block; margin-right: 80px; margin-left: 1px"
      @updateData="$emit('update', $event)"
      @updateProject="$emit('updateProject', $event)"
    />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FormEditProjectVue from "./FormEditProject.vue";
export default defineComponent({
  components: { FormEditProjectVue },
  props: {
    projectDetail: {
      type: Object,
    },
  },
  methods: {
    updateProjectDetail(data: any) {
      console.log(data);
    },
  },
  setup(props, context) {
    console.log(props.projectDetail);

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
