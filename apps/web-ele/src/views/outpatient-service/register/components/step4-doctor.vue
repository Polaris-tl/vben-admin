<script setup lang="ts">
import { ref, watch } from 'vue';

import { ElCard, ElOption, ElSelect } from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();
const selected = ref(store.data.doctor);
const doctors = ['张医生', '李医生', '王医生']; // 可根据科室动态替换

watch(
  () => store.data.department,
  () => {
    selected.value = '';
    store.data.doctor = '';
  },
);
</script>

<template>
  <ElCard>
    <h2>选择医生</h2>
    <ElSelect v-model="selected" placeholder="请选择医生" class="mt-4 w-full">
      <ElOption v-for="doc in doctors" :key="doc" :label="doc" :value="doc" />
    </ElSelect>
  </ElCard>
</template>
