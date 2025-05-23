<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps({
  modelValue: {
    type: dayjs,
    default: () => dayjs(),
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const today = dayjs();

const dayList = ['日', '一', '二', '三', '四', '五', '六'];

const list = Array.from({ length: 30 }).map((_, index) => {
  const day = today.add(index, 'day');
  return {
    day,
    dayStr: day.format('MM-DD'),
    date: day.date(),
    dayOfWeek: day.day(),
    dayName: `周${dayList[day.day()]}`,
  };
});
</script>

<template>
  <div class="flex flex-nowrap overflow-auto p-5">
    <div
      v-for="item in list"
      :key="item.dayStr"
      @click="
        () => {
          emit('update:modelValue', item.day);
          emit('change', item);
        }
      "
      :class="[{ 'item-selected': item.day.isSame(props.modelValue, 'day') }]"
      class="item flex-0 flex w-[100px] flex-shrink-0 flex-col items-center justify-center"
    >
      <div>{{ item.dayName }}</div>
      <div>{{ item.dayStr }}</div>
      <slot :item="item"> </slot>
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
