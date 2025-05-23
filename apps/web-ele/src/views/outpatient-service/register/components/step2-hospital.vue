<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRequest } from 'vue-hooks-plus';

import { getDeptsApi, getHospitalDistrictApi } from '#/api/register/index';

import { useRegisterStore } from '../store';

const store = useRegisterStore();

const { data: hospitalDistricts, loading: loading1 } = useRequest(
  getHospitalDistrictApi,
);
const {
  data: deptsList,
  loading: loading2,
  run: runDepts,
} = useRequest(getDeptsApi, {
  manual: true,
});

watch(
  () => store.data.district,
  () => {
    store.data.departmentL1 = undefined;
    store.data.departmentL2 = undefined;
    if (store.data.district) {
      const { id, districtCode } = store.data.district;
      runDepts({
        id,
        hospitalCode: districtCode,
      });
    }
  },
);

const subDeptsList = computed(() => {
  return (
    deptsList.value?.find((item) => item === store.data.departmentL1)
      ?.children ?? []
  );
});
</script>

<template>
  <div class="h-full bg-white p-5">
    <div v-loading="loading1" class="flex items-center justify-center gap-5">
      <div
        v-for="item in hospitalDistricts"
        :key="item.id"
        class="district-item"
        :class="[
          { 'district-item-selected': item.id === store.data.district?.id },
        ]"
        @click="() => store.setStep2District(item)"
      >
        <div>{{ item.districtName }}</div>
      </div>
    </div>
    <div v-loading="loading2" class="mt-5 flex">
      <div class="mr-5 mt-5 w-[300px]">
        <div
          v-for="item in deptsList"
          :key="item.deptCode"
          class="departmentL1-item"
          :class="[
            { 'departmentL1-item-selected': item === store.data.departmentL1 },
          ]"
          @click="() => store.setStep2DepartmentL1(item)"
        >
          <div>
            {{ item.deptName }}
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-1 flex-wrap gap-5">
        <div
          v-for="item in subDeptsList"
          :key="item.deptCode"
          class="departmentL2-item"
          :class="[
            { 'departmentL2-item-selected': item === store.data.departmentL2 },
          ]"
          @click="
            () => {
              store.setStep2DepartmentL2(item);
              store.nextStep();
            }
          "
        >
          <div>
            {{ item.deptName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.district-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 100px;
  color: #fff;
  cursor: pointer;
  background: rgb(40 191 228);
  border-radius: 6px;

  &-selected {
    background: #409eff;
  }
}

.departmentL1-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-top: 10px;
  color: #fff;
  cursor: pointer;
  background: rgb(40 191 228);
  border-radius: 6px;

  &-selected {
    background: #409eff;
  }
}

.departmentL2-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 100px;
  margin-top: 10px;
  color: #fff;
  cursor: pointer;
  background: rgb(40 191 228);
  border-radius: 6px;

  &-selected {
    background: #409eff;
  }
}
</style>
