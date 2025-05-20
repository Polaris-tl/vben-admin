<script lang="ts" setup>
import { ElInput, ElOption, ElSelect } from 'element-plus';

const emit = defineEmits(['blur', 'change']);

const modelValue = defineModel<[string, string]>({
  default: () => [undefined, undefined],
});

function onChange() {
  emit('change', modelValue.value);
}
</script>
<template>
  <div class="flex w-full gap-1">
    <ElSelect
      v-model="modelValue[0]"
      style="width: 80px"
      placeholder="类型"
      allow-clear
      :class="{ 'valid-success': !!modelValue[0] }"
      @blur="emit('blur')"
      @change="onChange"
    >
      <ElOption label="个人" value="personal" />
      <ElOption label="企业" value="enterprise" />
    </ElSelect>
    <ElInput
      placeholder="请输入11位手机号码"
      class="flex-1"
      allow-clear
      :class="{ 'valid-success': modelValue[1]?.match(/^1[3-9]\d{9}$/) }"
      v-model="modelValue[1]"
      :maxlength="11"
      type="tel"
      @blur="emit('blur')"
      @change="onChange"
    />
  </div>
</template>
