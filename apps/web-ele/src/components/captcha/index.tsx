import { createVNode, nextTick, ref, render } from 'vue';

import { ElButton, ElDialog, ElInput, ElMessage } from 'element-plus';

import { uuidv4 } from '#/utils';

type CaptchaResult = { code: string; imageKey: string };

function showCaptcha(): Promise<CaptchaResult> {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    document.body.append(container);

    const visible = ref(true);
    const captcha = ref('');
    const imageKey = ref(uuidv4());
    const inputRef = ref<InstanceType<typeof ElInput> | null>(null);

    const close = () => {
      render(null, container);
      container.remove();
    };

    const onConfirm = () => {
      if (!captcha.value.trim()) {
        ElMessage.warning('请输入验证码');
        return;
      }
      resolve({ code: captcha.value.trim(), imageKey: imageKey.value });
      close();
    };

    const onCancel = () => {
      reject(new Error('用户取消输入'));
      close();
    };

    const refreshImage = () => {
      imageKey.value = uuidv4();
    };

    const vnode = createVNode(() => (
      <ElDialog
        closeOnClickModal={false}
        closeOnPressEscape={false}
        onClose={onCancel}
        onOpened={() => nextTick(() => inputRef.value?.focus())}
        title="请输入图形验证码"
        v-model={visible.value}
        width="400px"
      >
        {{
          default: () => (
            <div class="flex items-center space-x-4">
              <ElInput
                class="flex-1"
                modelValue={captcha.value}
                onUpdate:modelValue={(val: string) => (captcha.value = val)}
                placeholder="请输入图形验证码"
                ref={inputRef}
              />
              <div
                class="cursor-pointer rounded border border-gray-300 hover:shadow"
                onClick={refreshImage}
                title="点击刷新验证码"
              >
                <img
                  alt="图形验证码"
                  class="h-10 w-auto"
                  // TODO 去掉前缀
                  src={`https://tih.chcmu-com.cn/chis-smart-admin/user/image-code?imageKey=${imageKey.value}`}
                />
              </div>
            </div>
          ),
          footer: () => (
            <div class="flex justify-end space-x-2">
              <ElButton onClick={onCancel}>取消</ElButton>
              <ElButton onClick={onConfirm} type="primary">
                确认
              </ElButton>
            </div>
          ),
        }}
      </ElDialog>
    ));

    render(vnode, container);
  });
}

export { showCaptcha };
