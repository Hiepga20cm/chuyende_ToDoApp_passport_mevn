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
      <a-textarea v-model:value="formState.project.Notes" />
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
        placeholder="Automatic tokenization"
        :options="list"
        @change="handleChange"
      ></a-select>
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
import type { SelectProps } from "ant-design-vue";
import projectApi from "../api/modules/project";
import taskApi from "../api/modules/task";
import { defineEmits } from "vue";
export default defineComponent({
  props: {
    ProjectId: {
      type: String,
    },
  },
  setup(props, context) {
    const users: any = ref({});
    let list: any = ref<SelectProps["options"]>();
    const emit = defineEmits();
    console.log(props);

    const getAllUser = async () => {
      try {
        // const res: any = await userApi.getAllUser();
        // users.value = res?.user;
        // console.log(users.value);
        // console.log(res?.user);
        const res2: any = await projectApi.getCollabotor(props.ProjectId);
        users.value = res2?.data;

        const userOption =
          users._rawValue.length > 0
            ? users._rawValue.map((e: any) => ({
                value: e._id,
                label: e.email || "Unknown",
                key: e._id,
              }))
            : [];
        console.log("userListOption", userOption);
        list.value = userOption;
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
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
        Name: "",
        Notes: "",
        Owner: localStorage.getItem("user"),
        Collaborator: undefined,
        StartDate: undefined,
        EndDate: undefined,
      },
    });
    const onFinish = async (values: any) => {
      try {
        console.log("Success:", values);
        console.log(JSON.parse(JSON.stringify(values)));
        const data = await JSON.parse(JSON.stringify(values));
        data.project.Owner = await localStorage.getItem("user");

        const res: any = await taskApi.CreateTask(
          props.ProjectId,
          data.project
        );

        if (res.success === true) {
          const data = res.task;
          for (let i = 0; i < data.Collaborator.length; i++) {
            const res: any = await userApi.getUserById(data.Collaborator[i]);
            console.log(res);
            data.Collaborator[i] = res.user;
          }
          context.emit("updateData", data);
        } else {
          alert(res.message);
        }
      } catch (error) {
        alert(error.response.data.message);

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
      console.log("aaaaa");
      console.log(users);
      console.log(JSON.parse(JSON.stringify(users)));
    },
    submit: function (data: any) {
      this.$emit(data);
    },
  },
});
</script>
