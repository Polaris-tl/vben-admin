<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElButton } from 'element-plus';

const list = ref<number[]>([]);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    window.$message.info('onConfirm');
    // drawerApi.close();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      handleUpdate(10);
    }
  },
});

function handleUpdate(len: number) {
  drawerApi.setState({ loading: true });
  setTimeout(() => {
    list.value = Array.from({ length: len }, (_v, k) => k + 1);
    drawerApi.setState({ loading: false });
  }, 2000);
}
</script>
<template>
  <Drawer title="自动计算高度">
    <div
      v-for="item in list"
      :key="item"
      class="even:bg-heavy bg-muted flex-center h-[220px] w-full"
    >
      {{ item }}
    </div>

    <template #prepend-footer>
      <ElButton link @click="handleUpdate(6)">点击更新数据</ElButton>
    </template>
  </Drawer>
</template>
