<script setup lang="ts">
import { computed } from 'vue';

import StepNotice from './components/step1-notice.vue';
import StepHospital from './components/step2-hospital.vue';
import StepDoctor from './components/step3-doctor/index.vue';
import StepTime from './components/step4-time.vue';
import StepConfirm from './components/step5-comfirm.vue';
import StepResult from './components/step6-result.vue';
import { useRegisterStore } from './store';

const store = useRegisterStore();

const steps = [
  StepNotice,
  StepHospital,
  StepDoctor,
  StepTime,
  StepConfirm,
  StepResult,
];

const step = computed(() => store.step);
const currentStepComponent = computed(() => steps[step.value]);
</script>

<template>
  <div class="h-full w-full">
    <component :is="currentStepComponent" />
  </div>
</template>
