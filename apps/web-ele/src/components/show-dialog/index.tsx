import type { JSX } from 'vue/jsx-runtime';

import { createVNode, ref, render } from 'vue';

import { ElButton, ElDialog } from 'element-plus';

import { CountdownButton } from '#/components';

type Params = { content?: JSX.Element; countdown?: number; title?: string };

function showDialog({ countdown, content, title = '提示' }: Params = {}) {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    document.body.append(container);

    const visible = ref(true);

    const close = () => {
      render(null, container);
      container.remove();
    };

    const onConfirm = () => {
      resolve(true);
      close();
    };

    const onCancel = () => {
      reject(new Error('用户取消输入'));
      close();
    };

    const vnode = createVNode(() => (
      <ElDialog
        closeOnClickModal={false}
        closeOnPressEscape={false}
        onClose={onCancel}
        title={title}
        v-model={visible.value}
        width="400px"
      >
        {{
          default: () => (
            <div class="flex items-center space-x-4">
              <div>{content}</div>
            </div>
          ),
          footer: () => (
            <div class="flex justify-end space-x-2">
              <CountdownButton
                class="mt-5 flex w-full justify-center gap-5"
                countdown={countdown}
                onConfirm={onConfirm}
              >
                {{
                  counting: ({ remaining }: { remaining: number }) => (
                    <ElButton class="w-[350px]" disabled size="large">
                      请仔细阅读{remaining}s
                    </ElButton>
                  ),
                  default: () => (
                    <>
                      <ElButton
                        class="w-[210px]"
                        onClick={onCancel}
                        size="large"
                      >
                        取消
                      </ElButton>
                      <ElButton
                        class="w-[210px]"
                        onClick={onConfirm}
                        size="large"
                        type="primary"
                      >
                        确认
                      </ElButton>
                    </>
                  ),
                }}
              </CountdownButton>
            </div>
          ),
        }}
      </ElDialog>
    ));

    render(vnode, container);
  });
}

export { showDialog };
