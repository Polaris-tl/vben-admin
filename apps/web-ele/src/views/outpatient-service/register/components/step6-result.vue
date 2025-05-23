<script setup lang="ts">
import { ElButton, ElCard, ElResult } from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();

const reset = () => {
  store.reset();
};
</script>

<template>
  <ElCard>
    <ElResult icon="success" title="挂号成功" sub-title="请按时前往医院就诊">
      <template #extra>
        <ElButton type="primary" @click="reset">重新挂号</ElButton>
      </template>
    </ElResult>
  </ElCard>
</template>
