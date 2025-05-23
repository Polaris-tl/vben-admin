<script setup lang="tsx">
import { computed, onMounted, ref, toRaw } from 'vue';
import { useRequest } from 'vue-hooks-plus';

import dayjs from 'dayjs';
import { ElRadioButton, ElRadioGroup, ElSwitch } from 'element-plus';

import { getScheduleApi } from '#/api/register/index';

import { useRegisterStore } from '../../store';
import Calender from './calender.vue';
import DoctorItem from './doctor-item.vue';
import { beforeSelect } from './utils';

const store = useRegisterStore();

const today = dayjs();

const currentDay = ref(dayjs());
const filter = ref({
  onlyAvailable: false,
  registerLevel: '全部',
});

const { data, loading, run } = useRequest(getScheduleApi, {
  manual: true,
});

onMounted(() => {
  run({
    deptCode: store.data.departmentL1?.deptCode!,
    endDate: today.add(1, 'month').format('YYYY-MM-DD'),
    hospitalCode: store.data.district?.districtCode!,
    registerLevel: '',
    startDate: today.format('YYYY-MM-DD'),
    subDeptCode: store.data.departmentL2?.deptCode!,
  });
});

const renderStatus = (day: dayjs.Dayjs) => {
  const find = data.value?.find((item) =>
    day.isSame(dayjs(item.clinicDate), 'day'),
  );
  if (!find) return <span style="color: gray">暂无</span>;
  return Number(find.leftResourceNum) > 0 ? (
    <span style="color: blue">有号</span>
  ) : (
    <span style="color: red">约满</span>
  );
};

const baseDoctorList = computed(() => {
  return (
    data.value?.filter(
      (item) =>
        item.stopFlag === '0' &&
        dayjs(item.clinicDate).isSame(currentDay.value, 'day'),
    ) || []
  );
});

const doctorList = computed(() => {
  let base = baseDoctorList.value;

  if (filter.value.onlyAvailable) {
    base = base.filter((item) => Number(item.leftResourceNum) > 0);
  }
  if (filter.value.registerLevel !== '全部') {
    base = base.filter(
      (item) => item.registerLevel === filter.value.registerLevel,
    );
  }
  return base;
});

const labelList = computed(() => {
  const base = baseDoctorList.value.map((item) => item.registerLevel) || [];
  return [...new Set(base)];
});

const handleSelect = async (item: RegisterApi.DoctorSchedule) => {
  await beforeSelect(item);
  store.nextStep();
  store.setStep3Doctor(item);
};
</script>

<template>
  <div class="h-full bg-white p-5">
    <div>
      <Calender v-model="currentDay">
        <template #default="{ item }">
          <component :is="renderStatus(item.day)" />
        </template>
      </Calender>
    </div>
    <div class="mt-5 flex items-center">
      <ElRadioGroup class="mr-5" v-model="filter.registerLevel">
        <ElRadioButton label="全部" key="全部" />
        <ElRadioButton v-for="item in labelList" :key="item" :label="item" />
      </ElRadioGroup>
      只看有号<ElSwitch class="ml-2" v-model="filter.onlyAvailable" />
    </div>
    <div v-loading="loading" class="mt-5 flex flex-wrap">
      <DoctorItem
        v-for="(item, index) in doctorList"
        @select="handleSelect(toRaw(item))"
        :key="index"
        :item="item"
        class="doctor-item mb-5 mr-5 flex h-[120px] w-[360px] items-start space-x-4 rounded-lg bg-white p-4 shadow-sm"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.doctor-item {
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  }
}
</style>
