<script setup lang="ts">
import {
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
} from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();

const confirm = () => {
  store.nextStep();
};
</script>

<template>
  <ElCard>
    <h2>确认挂号信息</h2>
    <ElDescriptions border :column="1" class="my-4">
      <ElDescriptionsItem label="院区">
        {{ store.data.hospital }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="科室">
        {{ store.data.department }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="医生">
        {{ store.data.doctor }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="时间">
        {{ store.data.time }}
      </ElDescriptionsItem>
    </ElDescriptions>

    <ElButton type="success" @click="confirm">确认挂号</ElButton>
  </ElCard>
</template>
