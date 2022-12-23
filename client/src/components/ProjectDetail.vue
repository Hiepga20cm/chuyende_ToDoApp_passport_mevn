<template>
  <div
    class="components-page-header-demo-responsive"
    style="border: 1px solid rgb(235, 237, 240)"
  >
    <a-page-header :title="this.projectDetail.Name">
      <template #extra>
        <EditPojectVue
          :projectDetail="this.projectDetail"
          @updateProject="updateProject($event)"
        />

        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(this.projectDetail._id)"
          @cancel="cancel"
        >
          <a-button key="3">Delete Project</a-button>
        </a-popconfirm>

        <!-- <CreateProject /> -->
        <CreateTask
          :ProjectId="this.projectDetail._id"
          @update="$emit('update1', $event)"
        />
      </template>

      <div class="content">
        <div class="main">
          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="Created"
              ><span v-if="this.projectDetail.StartDate !== null">
                {{
                  dayjs(this.projectDetail.StartDate, "YYYY-MM-DD").fromNow()
                }}
              </span></a-descriptions-item
            >
            <a-descriptions-item label="Collaborator"
              ><div v-for="coll in this.projectDetail.Collaborator">
                <div v-if="coll.avatar !== ''">
                  <a-avatar :src="coll.avatar" />
                </div>
                <div v-else-if="coll.avatar === ''">
                  <a-avatar>{{ getFirstKey(coll.lastName) }}</a-avatar>
                </div>
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="EndDate"
              ><span v-if="this.projectDetail.EndDate !== null">
                {{ dayjs(this.projectDetail.EndDate, "YYYY-MM-DD").fromNow() }}
              </span>
              <span v-if="this.projectDetail.EndDate === null"> Null </span>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="Effective Time"
              >2017-10-10</a-descriptions-item
            > -->
            <a-descriptions-item label="Description">
              {{ this.projectDetail.Notes }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import CreateProject from "./CreateProject.vue";
import CreateTask from "./CreateTask.vue";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import projectApi from "../api/modules/project";
import EditPojectVue from "./EditPoject.vue";
import { getFirstKey } from "../hook/upFirstKey";
import { message } from "ant-design-vue";
import { defineComponent } from "vue";
dayjs.extend(relativeTime);
import router from "../router/index";
export default defineComponent({
  props: {
    projectDetail: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, context) {
    const confirm = async (id: any) => {
      try {
        const res: any = await projectApi.delete(id);
        //console.log(res);

        if (res.success == true) {
          context.emit("deleteProject", id);
        }
        //router.push({ path: "/layout" });
        delete props.projectDetail.Name;
        delete props.projectDetail.Collaborator;
        delete props.projectDetail.Notes;
        delete props.projectDetail.StartDate;
        delete props.projectDetail.EndDate;
        delete props.projectDetail.TaskList;
      } catch (error) {
        console.log(error);
      }
    };

    const cancel = (e: MouseEvent) => {
      console.log(e);
      message.error("Closed");
    };
    return {
      confirm,
      cancel,
    };
  },
  components: {
    CreateProject,
    CreateTask,
    EditPojectVue,
  },
  methods: {
    hienthi() {
      console.log(this.projectDetail._id);
      projectApi.delete(this.projectDetail._id);
    },
    showAvatar() {
      // console.log(this.projectDetail.Collaborator.avatar);
      return this.projectDetail.Collaborator.avatar;
    },
    dayjs,
    updateProjectDetail(data: any) {
      console.log("ssssssssupdate", data);
    },
    getFirstKey,
    async updateProject(data: any) {
      try {
        this.projectDetail.Collaborator = data.Collaborator;
        this.projectDetail.EndDate = data.EndDate;
        this.projectDetail.Name = data.Name;
        this.projectDetail.Notes = data.Notes;
        this.projectDetail.Owner = data.Owner;
        this.projectDetail.StartDate = data.StartDate;
        this.projectDetail.EndDate = data.EndDate;
        this.projectDetail.Status = data.Status;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
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
