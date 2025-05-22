<script setup lang="ts">
import { ElAlert, ElCard } from 'element-plus';
</script>

<template>
  <ElCard>
    <h2>挂号须知</h2>
    <ElAlert
      title="请仔细阅读以下挂号须知"
      type="info"
      :closable="false"
      class="mb-4"
    />
    <ul>
      <li>1. 请确保您的实名信息正确。</li>
      <li>2. 若爽约，系统将限制挂号权限。</li>
      <li>3. 建议至少提前 30 分钟到达医院。</li>
    </ul>
  </ElCard>
</template>
