<template>
  <a-card
    title="Fill form to change password"
    :bordered="false"
    style="width: 650px"
  >
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item
        has-feedback
        label="Email"
        name="email"
        :rules="[{ type: 'email' }]"
      >
        <a-input v-model:value="formState.email" autocomplete="off" />
      </a-form-item>

      <a-form-item has-feedback label="Password" name="password">
        <a-input
          v-model:value="formState.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="New Password" name="newPassword">
        <a-input
          v-model:value="formState.newPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item has-feedback label="Confirm" name="checkNewPassword">
        <a-input
          v-model:value="formState.checkNewPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts">
import type { Rule } from "ant-design-vue/es/form";
import { defineComponent, reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import userApi from "../api/modules/user";
interface FormState {
  email: string;
  password: string;
  newPassword: string;
  checkNewPassword: string;
}
export default defineComponent({
  props: {
    userId: {
      type: String,
    },
  },
  setup(props: any) {
    const formRef: any = ref<FormInstance>();
    const formState = reactive<FormState>({
      email: "",
      password: "",
      newPassword: "",
      checkNewPassword: "",
    });

    let validatePass = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (formState.checkNewPassword !== "") {
          formRef.value.validateFields("checkPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== formState.newPassword) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      newPassword: [
        { required: true, validator: validatePass, trigger: "change" },
      ],
      checkNewPassword: [{ validator: validatePass2, trigger: "change" }],
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const handleFinish = async (values: FormState) => {
      try {
        console.log(values.email, formState);

        const data = {
          email: values.email,
          password: values.password,
          newPassword: values.checkNewPassword,
        };
        console.log(data);

        const res: any = await userApi.changePassword(data, props.userId);
        console.log(res);

        if (res.success == true) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      } catch (error) {
        // console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const handleValidate = (...args) => {
      console.log(args);
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
    };
  },
});
</script>
