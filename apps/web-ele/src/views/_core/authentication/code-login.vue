<script lang="ts" setup>
import { ref } from 'vue';

import { $t } from '@vben/locales';

import { ElButton, ElCheckbox } from 'element-plus';

import { useVbenForm, z } from '#/adapter/form';
import { showCaptcha } from '#/components';
import { useAuthStore } from '#/store';

defineOptions({ name: 'CodeLogin' });

const CODE_LENGTH = 6;

const checked = ref(false);
const authStore = useAuthStore();

async function handleLogin() {
  authStore.authLogin({
    captcha: true,
    password: '123456',
    selectAccount: 'vben',
    username: 'vben',
  });
  if (!checked.value) {
    window.$message.error('请先勾选同意用户协议');
    return;
  }
  await formApi.validate();
  const values = await formApi.getValues();
  console.log(values);
}

const [LoginForm, formApi] = useVbenForm({
  commonConfig: {
    hideRequiredMark: true,
    hideLabel: true,
    wrapperClass: 'w-full',
  },
  showDefaultActions: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号码',
        style: { height: '40px' },
      },
      fieldName: 'phoneNumber',
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^1\d{10}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('authentication.code'),
        handleSendCode: async () => {
          const res = await showCaptcha();
          console.log(res);
        },
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ],
});
</script>

<template>
  <LoginForm class="w-full" />
  <div class="w-full">
    <ElButton
      type="primary"
      @click="handleLogin"
      class="!h-[40px] w-full"
      :disabled="!checked"
    >
      注册并登录
    </ElButton>
    <div class="mt-4 flex justify-start text-sm">
      <ElCheckbox v-model="checked" />
      <div class="ml-2 flex items-center justify-center">
        我已阅读并同意
        <ElButton link class="m-0 p-0" type="primary">
          《用户使用协议》
        </ElButton>
        和
        <ElButton link class="m-0 p-0" type="primary">
          《隐私保护协议》
        </ElButton>
      </div>
    </div>
  </div>
</template>
