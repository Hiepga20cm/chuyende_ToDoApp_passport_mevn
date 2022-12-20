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
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
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
        <span v-for="coll in record.Collaborator">
          <div v-if="coll.avatar !== ''">
            <a-avatar :src="coll.avatar" />
          </div>
          <div v-else-if="coll.avatar == ''">
            <a-avatar>{{ getFirstKey(coll.lastName) }}</a-avatar>
          </div>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a-divider type="vertical" />
          <a>Edit Task</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { getFirstKey } from "../hook/upFirstKey";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  props: {
    projectDetail: {
      type: Object,
    },
  },
  methods: {
    getFirstKey,
    dayjs,
  },
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>
