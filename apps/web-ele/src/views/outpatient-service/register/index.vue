<script setup lang="ts">
import { computed } from 'vue';

import StepNotice from './components/step1-notice.vue';
import StepHospital from './components/step2-hospital.vue';
import StepDepartment from './components/step3-department.vue';
import StepDoctor from './components/step4-doctor.vue';
import StepTime from './components/step5-time.vue';
import StepConfirm from './components/step6-comfirm.vue';
import StepResult from './components/step7-result.vue';
import { useRegisterStore } from './store';

const store = useRegisterStore();

const steps = [
  StepNotice,
  StepHospital,
  StepDepartment,
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
