<script setup lang="ts">
import type { PropType } from 'vue';

const { item } = defineProps({
  item: {
    type: Object as PropType<RegisterApi.DoctorSchedule>,
    default: () => ({}),
  },
});
const emit = defineEmits(['select']);

const DEFAULT_IMG =
  'https://xinan1.zos.ctyun.cn/chcmu-static/smarthospital/1632454307851ZPSYVUDAAT5L81RCVR9U316S.png';
</script>

<template>
  <div
    class="doctor-item mb-5 mr-5 flex h-[120px] w-[360px] items-start space-x-4 rounded-lg bg-white p-4 shadow-sm"
    @click="emit('select', item)"
  >
    <img
      :src="item.doctorPhotoPath || DEFAULT_IMG"
      alt="doctor"
      class="h-20 w-20 rounded-lg bg-blue-50 object-cover"
    />

    <div class="flex-1 space-y-2">
      <div class="text-base font-semibold text-gray-900">
        {{ item.doctorName || item.clinicLabel }}
        <span class="ml-2 text-gray-700">
          {{ item.deptName || item?.subDeptName }} |
          {{ item.registerLevel }}
        </span>
      </div>

      <p class="line-clamp-2 text-sm leading-snug text-gray-600">
        {{ item.doctorDesc }}
      </p>

      <div class="mt-2 flex items-center justify-end space-x-2">
        <span class="text-sm text-red-500">￥{{ item.totalCharges }}</span>
        <div class="rounded bg-sky-500 px-2 py-0.5 text-xs text-white">
          {{
            Number(item.leftResourceNum) > 0
              ? item.stopFlag === '0'
                ? `余号:${Number(item.leftResourceNum) > 99 ? 99 : item.leftResourceNum}`
                : '停诊'
              : '约满'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  margin-right: 10px;
  color: #409eff;
  cursor: pointer;
  border: 1px solid #409eff;
  border-radius: 6px;

  &-selected {
    color: #fff;
    background: #409eff;
  }
}
</style>
