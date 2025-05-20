<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@vben/hooks';

import {
  ElConfigProvider,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';

import { elementLocale } from '#/locales';

defineOptions({ name: 'App' });

window.$notification = ElNotification;
window.$messageBox = ElMessageBox;
window.$message = ElMessage;

useElementPlusDesignTokens();
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
