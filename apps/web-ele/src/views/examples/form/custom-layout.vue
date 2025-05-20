<script lang="ts" setup>
import { h } from 'vue';

import { Page } from '@vben/common-ui';

import { ElCard } from 'element-plus';

import { useVbenForm } from '#/adapter/form';

import DocButton from '../doc-button.vue';

const [CustomLayoutForm] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  schema: [
    {
      component: 'Select',
      fieldName: 'field1',
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
        ],
      },
      label: '字符串1',
    },
    {
      component: 'TreeSelect',
      fieldName: 'field2',
      componentProps: {
        data: [
          {
            label: '选项1',
            value: '1',
            children: [
              {
                label: '选项1-1',
                value: '1-1',
              },
            ],
          },
        ],
      },
      label: '字符串2',
    },
    {
      component: 'Mention',
      fieldName: 'field3',
      label: '字符串3',
    },
    {
      component: 'Input',
      fieldName: 'field4',
      label: '字符串4',
    },
    {
      component: 'InputNumber',
      fieldName: 'field5',
      // 从第三列开始 相当于中间空了一列
      formItemClass: 'col-start-3',
      label: '前面空了一列',
    },
    {
      component: 'Divider',
      fieldName: '_divider',
      formItemClass: 'col-span-3',
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => h('div', '分割线'),
        };
      },
    },
    {
      component: 'Input',
      fieldName: 'field6',
      componentProps: {
        placeholder: '请输入',
        type: 'textarea',
      },
      // 占满三列空间 基线对齐
      formItemClass: 'col-span-3 items-baseline',
      label: '占满三列',
    },
    {
      component: 'Input',
      fieldName: 'field7',
      // 占满2列空间 从第二列开始 相当于前面空了一列
      formItemClass: 'col-span-2 col-start-2',
      label: '占满2列',
    },
    {
      component: 'Input',
      fieldName: 'field8',
      // 左右留空
      formItemClass: 'col-start-2',
      label: '左右留空',
    },
    {
      component: 'Input',
      fieldName: 'field9',
      componentProps: {
        placeholder: '请输入',
        type: 'password',
      },
      formItemClass: 'col-start-1',
      label: '字符串',
    },
  ],
  // 一共三列
  wrapperClass: 'grid-cols-3',
});
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="使用tailwind自定义表单项的布局"
    title="表单自定义布局"
  >
    <template #description>
      <div class="text-muted-foreground">
        <p>使用tailwind自定义表单项的布局，使用Divider分割表单。</p>
      </div>
    </template>
    <template #extra>
      <DocButton class="mb-2" path="/components/common-ui/vben-form" />
    </template>
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>使用tailwind自定义布局</div>
        </div>
      </template>
      <CustomLayoutForm />
    </ElCard>
  </Page>
</template>
