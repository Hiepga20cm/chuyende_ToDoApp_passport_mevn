<template>
  <a-tabs>
    <a-tab-pane key="1" tab="Task">
      <TableTask :projectDetail="this.projectDetail"
    /></a-tab-pane>
  </a-tabs>
</template>
<script>
import TableTask from "./TableTask.vue";

export default {
  props: {
    projectDetail: {
      type: Object,
    },
  },
  components: {
    TableTask,
  },
  methods: {
    hienthi() {
      console.log(this.projectDetail, "ddd");
    },
    showAvatar() {
      // console.log(this.projectDetail.Collaborator.avatar);
      return this.projectDetail.Collaborator.avatar;
    },
  },
};
</script>
