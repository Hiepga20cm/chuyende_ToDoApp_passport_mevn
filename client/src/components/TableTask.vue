<template>
  <a-table :columns="columns" :data-source="this.projectDetail.TaskList">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.Name }}
        </a>
      </template>

      <template v-else-if="column.key === 'status'">
        <div v-if="record.Status == 'todo'">
          <a-tag color="success">
            <template>
              <check-circle-outlined />
            </template>
            To Do
          </a-tag>
        </div>
        <div v-if="record.Status == 'in_progress'">
          <a-tag color="processing">
            <template #icon>
              <sync-outlined :spin="true" />
            </template>
            processing
          </a-tag>
        </div>
        <div v-if="record.Status == 'done'">
          <a-tag color="blue">
            <template>
              <sync-outlined :spin="true" />
            </template>
            Done
          </a-tag>
        </div>
      </template>

      <template v-else-if="column.key === 'startDate'">
        <span>
          {{ dayjs(record.StartDate, "YYYY-MM-DD").fromNow() }}
        </span>
      </template>
      <template v-else-if="column.key === 'endDate'">
        <span v-if="record.EndDate !== null">
          {{ dayjs(record.EndDate, "YYYY-MM-DD").fromNow() }}
        </span>
        <span v-if="record.EndDate === null"> Null </span>
      </template>
      <template v-else-if="column.key === 'collaborator'">
        <div v-for="coll in record.Collaborator" style="display: inline-block">
          <div v-if="coll.avatar !== ''">
            <a-avatar :src="coll.avatar" />
          </div>
          <div v-else-if="coll.avatar === ''">
            <a-avatar>{{ getFirstKey(coll.lastName) }}</a-avatar>
          </div>
        </div>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record._id)"
            @cancel="cancel"
          >
            <a href="#">Delete</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-divider type="vertical" />
          <!-- <a>Edit Task</a> -->
          <EditTask :taskDetail="record" @updateTask="test($event)" />
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { getFirstKey } from "../hook/upFirstKey";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { message } from "ant-design-vue";
import taskApi from "../api/modules/task";
import EditTask from "./EditTask.vue";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons-vue";
dayjs.extend(relativeTime);
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Start Date",
    //dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "EndDate",
    key: "endDate",
    //dataIndex: "endDate",
  },
  {
    title: "Collaborator",
    key: "collaborator",
  },

  {
    title: "Action",
    key: "action",
  },
];

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
    EditTask,
  },
  props: {
    projectDetail: {
      type: Object,
    },
  },
  methods: {
    getFirstKey,
    dayjs,
    async test(data: any) {
      console.log("test", data);
      for (let i = 0; i < this.projectDetail.TaskList.length; i++) {
        if (this.projectDetail.TaskList[i]._id == data._id) {
          this.projectDetail.TaskList[i].Collaborator = data.Collaborator;
          this.projectDetail.TaskList[i].EndDate = data.EndDate;
          this.projectDetail.TaskList[i].Name = data.Name;
          this.projectDetail.TaskList[i].Notes = data.Notes;
          this.projectDetail.TaskList[i].StartDate = data.StartDate;
          this.projectDetail.TaskList[i].EndDate = data.EndDate;
          this.projectDetail.TaskList[i].Status = data.Status;
        }
      }
    },
  },
  setup(props: any) {
    const confirm = (TaskId: any) => {
      for (let i = 0; i < props.projectDetail.TaskList.length; i++) {
        if (props.projectDetail.TaskList[i]._id == TaskId) {
          console.log(props.projectDetail.TaskList[i]);

          const res = taskApi.DeleteTask(TaskId);
          console.log(res);

          props.projectDetail.TaskList.splice(i, 1);
        } else {
          alert("Something Wrong");
        }
      }

      console.log(TaskId);

      message.success("Deleted");
    };

    const cancel = (e: MouseEvent) => {
      console.log(e);
      message.error("Closed");
    };
    return {
      confirm,
      cancel,

      columns,
    };
  },
});
</script>
