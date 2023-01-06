<template>
  <a-form
    :model="formState"
    v-bind="layout"
    name="nest-messages"
    :validate-messages="validateMessages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['project', 'Name']"
      label="Name"
      :rules="[{ required: true }]"
    >
      <a-input v-model:value="formState.project.Name" />
    </a-form-item>
    <a-form-item
      :name="['project', 'Notes']"
      label="Description"
      :rules="[{ type: 'string' }]"
    >
      <a-input v-model:value="formState.project.Notes" />
    </a-form-item>
    <a-form-item
      :name="['project', 'Collaborator']"
      label="Collaborator"
      :rules="[{ type: 'array' }]"
    >
      <!-- <a-input-number v-model:value="formState.project.Owner" /> -->
      <a-select
        v-model:value="formState.project.Collaborator"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Select User"
        :options="list"
        @change="handleChange"
      ></a-select>
    </a-form-item>
    <a-form-item :name="['project', 'Status']" label="Status">
      <a-select v-model:value="formState.project.Status" style="width: 120px">
        <a-select-option value="todo">To do</a-select-option>
        <a-select-option value="in_progress">In Progress</a-select-option>
        <a-select-option value="done">Done</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :name="['project', 'StartDate']" label="StartDate">
      <a-date-picker v-model:value="formState.project.StartDate" />
    </a-form-item>
    <a-form-item :name="['project', 'EndDate']" label="EndDate">
      <a-date-picker v-model:value="formState.project.EndDate" />
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
dayjs.extend(relativeTime);
export default defineComponent({
  props: {
    projectDetail: {
      type: Object,
    },
  },

  setup(props, context) {
    const users: any = ref({});
    let list: any = ref<SelectProps["options"]>();
    const pr: any = props;
    const userOfGroup = ref([]);
    const getAllUser = async () => {
      try {
        const res: any = await userApi.getAllUser();
        users.value = res?.user;
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
          pr.projectDetail.Collaborator.length > 0
            ? pr.projectDetail.Collaborator.map((e: any) => ({
                value: e._id,
                lable: e.email || "Unknown",
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
      project: {
        Name: pr.projectDetail.Name,
        Notes: pr.projectDetail.Notes,
        Owner: localStorage.getItem("user"),
        Status: pr.projectDetail.Status,
        Collaborator: userOfGroup,
        StartDate: dayjs(pr.projectDetail.StartDate, "YYYY-MM-DD"),
        EndDate: dayjs(pr.projectDetail.EndDate, "YYYY-MM-DD"),
      },
    });
    const onFinish = async (values: any) => {
      try {
        const data = await JSON.parse(JSON.stringify(values));
        data.project.Owner = await localStorage.getItem("user");
        const idProject: any = pr.projectDetail._id;
        console.log("data", data);
        const res: any = await projectApi.editProject(idProject, data.project);
        if (res.success === true) {
          for (let i = 0; i < data.project.Collaborator.length; i++) {
            const res: any = await userApi.getUserById(
              data.project.Collaborator[i]
            );
            data.project.Collaborator[i] = res.user;
          }
        }
        context.emit("updateProject", data.project);
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
