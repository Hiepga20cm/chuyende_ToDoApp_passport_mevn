<template>
  <a-tabs>
    <a-tab-pane key="1" tab="Todo">
      <TableTask :projectDetail="this.projectDetail"
    /></a-tab-pane>
    <a-tab-pane key="2" tab="In Progress" force-render
      >Content of Tab Pane 2</a-tab-pane
    >
    <a-tab-pane key="3" tab="Done">{{ this.projectDetail.Name }}</a-tab-pane>
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
