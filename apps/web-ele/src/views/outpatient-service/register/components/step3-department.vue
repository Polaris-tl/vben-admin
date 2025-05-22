<script setup lang="ts">
import { ref, watch } from 'vue';

import { ElCard, ElOption, ElSelect } from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();
const departments = ['内科', '外科', '儿科'];
const selected = ref(store.data.department);

watch(
  () => store.data.hospital,
  () => {
    selected.value = '';
    store.data.department = '';
  },
);
</script>

<template>
  <ElCard>
    <h2>选择科室</h2>
    <ElSelect v-model="selected" placeholder="请选择科室" class="mt-4 w-full">
      <ElOption
        v-for="dept in departments"
        :key="dept"
        :label="dept"
        :value="dept"
      />
    </ElSelect>
  </ElCard>
</template>
