<script setup lang="ts">
import { ref, watch } from 'vue';

import { ElCard, ElRadioButton, ElRadioGroup } from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();
const times = ['上午 08:00 - 11:00', '下午 13:30 - 16:30'];
const selected = ref(store.data.time);

watch(
  () => store.data.doctor,
  () => {
    selected.value = '';
    store.data.time = '';
  },
);
</script>

<template>
  <ElCard>
    <h2>选择时间段</h2>
    <ElRadioGroup v-model="selected" class="mt-4">
      <ElRadioButton v-for="time in times" :key="time" :label="time" />
    </ElRadioGroup>
  </ElCard>
</template>
