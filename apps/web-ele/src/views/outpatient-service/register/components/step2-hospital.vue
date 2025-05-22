<script setup lang="ts">
import { ref } from 'vue';

import { ElCard, ElRadioButton, ElRadioGroup } from 'element-plus';

import { useRegisterStore } from '../store';

const store = useRegisterStore();
const hospitals = ['东院', '西院'];
const selected = ref(store.data.hospital);
</script>

<template>
  <ElCard>
    <h2>选择院区</h2>
    <ElRadioGroup v-model="selected" class="mt-4">
      <ElRadioButton v-for="h in hospitals" :key="h" :label="h" />
    </ElRadioGroup>
  </ElCard>
</template>
