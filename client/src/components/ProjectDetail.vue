<template>
  <div
    class="components-page-header-demo-responsive"
    style="border: 1px solid rgb(235, 237, 240)"
  >
    <a-page-header :title="this.projectDetail.Name">
      <template #extra>
        <a-button key="2">EditProject</a-button>
        <a-button @click="hienthi" key="3">Delete Project</a-button>
        <!-- <CreateProject /> -->
        <CreateTask :ProjectId="this.projectDetail._id" />
      </template>

      <div class="content">
        <div class="main">
          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="Created">{{
              this.projectDetail.StartDate
            }}</a-descriptions-item>
            <a-descriptions-item
              label="Collaborator"
              v-for="coll in this.projectDetail.Collaborator"
            >
              <a-avatar :src="coll.avatar" />
            </a-descriptions-item>
            <a-descriptions-item label="EndDate">{{
              this.projectDetail.EndDate
            }}</a-descriptions-item>
            <a-descriptions-item label="Effective Time"
              >2017-10-10</a-descriptions-item
            >
            <a-descriptions-item label="Description">
              {{ this.projectDetail.Notes }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-page-header>
  </div>
</template>

<script>
import CreateProject from "./CreateProject.vue";
import CreateTask from "./CreateTask.vue";
export default {
  props: {
    projectDetail: {
      type: Object,
    },
  },
  components: {
    CreateProject,
    CreateTask,
  },
  methods: {
    hienthi() {
      console.log(this.projectDetail);
    },
    showAvatar() {
      // console.log(this.projectDetail.Collaborator.avatar);
      return this.projectDetail.Collaborator.avatar;
    },
  },
};
</script>

<style>
.components-page-header-demo-responsive {
  padding-bottom: 20px;
}
.components-page-header-demo-responsive tr:last-child td {
  padding-bottom: 0;
}
#components-page-header-demo-responsive .content {
  display: flex;
}
#components-page-header-demo-responsive .ant-statistic-content {
  font-size: 20px;
  line-height: 28px;
}
@media (max-width: 576px) {
  #components-page-header-demo-responsive .content {
    display: block;
  }

  #components-page-header-demo-responsive .main {
    width: 100%;
    margin-bottom: 12px;
  }

  #components-page-header-demo-responsive .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
  }
}
</style>
