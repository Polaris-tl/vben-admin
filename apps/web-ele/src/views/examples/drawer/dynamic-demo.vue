<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { ElButton } from 'element-plus';

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    window.$message.info('onConfirm');
    // drawerApi.close();
  },
  title: '动态修改配置示例',
});

// const state = drawerApi.useStore();

function handleUpdateTitle() {
  drawerApi.setState({ title: '内部动态标题' });
}
</script>
<template>
  <Drawer>
    <div class="flex-col-center">
      <ElButton class="mb-3" type="primary" @click="handleUpdateTitle()">
        内部动态修改标题
      </ElButton>
    </div>
  </Drawer>
</template>
