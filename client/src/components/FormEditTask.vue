<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['task', 'Name']"
      label="Name"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.task.Name" />
    </a-form-item>
    <a-form-item
      :name="['task', 'Notes']"
      label="Description"
      :rules="[{ type: 'string' }]"
    >
      <a-input v-model:value="formState.task.Notes" />
    </a-form-item>
    <a-form-item
      :name="['task', 'Collaborator']"
      label="Collaborator"
      :rules="[{ type: 'array' }]"
    >
      <!-- <a-input-number v-model:value="formState.project.Owner" /> -->
      <a-select
        v-model:value="formState.task.Collaborator"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select User"
        :options="list"
        @change="handleChange"
      ></a-select>
    </a-form-item>
    <a-form-item :name="['task', 'Status']" label="Status">
      <a-select v-model:value="formState.task.Status" style="width: 120px">
        <a-select-option value="todo">To do</a-select-option>
        <a-select-option value="in_progress">In Progress</a-select-option>
        <a-select-option value="done">Done</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :name="['task', 'StartDate']" label="StartDate">
      <a-date-picker v-model:value="formState.task.StartDate" />
    </a-form-item>
    <a-form-item :name="['task', 'EndDate']" label="EndDate">
      <a-date-picker v-model:value="formState.task.EndDate" />
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import userApi from "../api/modules/user";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { SelectProps } from "ant-design-vue";
import projectApi from "../api/modules/project";
import taskApi from "../api/modules/task";
dayjs.extend(relativeTime);
export default defineComponent({
  props: {
    taskDetail: {
      type: Object,
    },
  },

  setup(props: any, context) {
    const users: any = ref({});
    let list: any = ref<SelectProps["options"]>();
    console.log("asdaf", props.taskDetail);

    const pr: any = props;
    console.log("ssssddgh", pr);

    const userOfGroup = ref([]);
    const getAllUser = async () => {
      try {
        const res2: any = await projectApi.getCollabotor(
          props.taskDetail.ProjectId
        );
        users.value = res2?.data;
        const userOption =
          users._rawValue.length > 0
            ? users._rawValue.map((e: any) => ({
                value: e._id,
                label: e.email || "Unknown",
                key: e._id,
              }))
            : [];
        list.value = userOption;
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();

    const getUserOfProject = async (pr: any) => {
      try {
        const userDefault =
          pr.taskDetail.Collaborator.length > 0
            ? pr.taskDetail.Collaborator.map((e: any) => ({
                value: e._id,
                lable: e.firstName + " " + e.lastName || "Unknown",
                key: e._id,
              }))
            : [];
        userOfGroup.value = userDefault;
      } catch (error) {
        console.log(error);
      }
    };
    getUserOfProject(pr);
    const value1 = ref<string[]>([]);
    const handleChange1 = (value: []) => {
      console.log(`selected ${value}`);
    };
    watch(value1, () => {
      console.log("value", value1.value);
    });

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const formState = reactive({
      task: {
        Name: pr.taskDetail.Name,
        Notes: pr.taskDetail.Notes,
        Owner: localStorage.getItem("user"),
        Status: pr.taskDetail.Status,
        Collaborator: userOfGroup,
        StartDate: dayjs(pr.taskDetail.StartDate, "YYYY-MM-DD"),
        EndDate: dayjs(pr.taskDetail.EndDate, "YYYY-MM-DD"),
      },
    });
    const onFinish = async (values: any) => {
      try {
        const data: any = await JSON.parse(JSON.stringify(values));
        data.task.Owner = await localStorage.getItem("user");
        const idTask: any = pr.taskDetail._id;
        data.task._id = idTask;

        for (let i = 0; i < data.task.Collaborator.length; i++) {
          const user: any = data.task.Collaborator[i];
          // console.log("user", data.task.Collaborator[i]);
          const res: any = await userApi.getUserById(user);
          if (res.success === true) {
            console.log(res.user);
          }
          data.task.Collaborator[i] = res.user;
        }
        context.emit("updateTask", data.task);
        const res: any = await taskApi.EditTask(idTask, data.task);

        // }
        // const res: any = await taskApi.EditTask(idTask, data.task);
        // if (res.success === true) {
        //   context.emit("updateTask", data.task);
        // }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      list,
      handleChange1,
      value1,
      users,
      formState,
      onFinish,
      layout,
      validateMessages,
      value: ref([]),
      handleChange,
    };
  },
  data() {
    return {
      options2: [],
    };
  },
  methods: {
    log: function (users: any) {
      console.log(JSON.parse(JSON.stringify(users)));
    },
    dayjs,
  },
});
</script>
