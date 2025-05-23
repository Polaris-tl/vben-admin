<script setup lang="ts">
import { onMounted } from 'vue';

import { useCountdown } from '@vueuse/core';
import { ElButton } from 'element-plus';

const props = withDefaults(defineProps<{ countdown?: number }>(), {
  countdown: 5,
});
defineEmits(['confirm']);

const { start, remaining } = useCountdown(-1);
onMounted(() => {
  start(props.countdown);
});
</script>

<template>
  <div>
    <template v-if="remaining > 0">
      <slot name="counting" :remaining="remaining">
        <div>{{ remaining }}s</div>
      </slot>
    </template>
    <template v-else>
      <slot>
        <ElButton type="primary" @click="$emit('confirm')">确认</ElButton>
      </slot>
    </template>
  </div>
</template>
