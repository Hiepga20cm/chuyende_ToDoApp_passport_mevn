<template>
  <a type="primary" @click="showDrawer">Edit</a>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Edit Task"
    placement="right"
    @after-visible-change="afterVisibleChange"
    width="50%"
    destroyOnClose
  >
    <FormEditTaskVue
      :taskDetail="this.taskDT"
      style="display: block; margin-right: 80px; margin-left: 1px"
      @updateTask="$emit('updateTask', $event)"
    />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { any } from "vue-types";
import FormEditProjectVue from "./FormEditProject.vue";
import FormEditTaskVue from "./FormEditTask.vue";
export default defineComponent({
  components: { FormEditTaskVue },
  props: {
    taskDetail: {
      type: Object,
    },
  },

  setup(props: any, context) {
    console.log("asdfasffg");

    console.log(props.record);

    const taskDT: any = props.taskDetail;

    console.log("task", taskDT);

    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log("visible", bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      taskDT,
      visible,
      afterVisibleChange,
      showDrawer,
    };
  },
  methods: {
    updateProjectDetail(data: any) {
      console.log(data);
    },
  },
});
</script>
