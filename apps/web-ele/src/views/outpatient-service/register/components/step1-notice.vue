<script setup lang="tsx">
import { useRouter } from 'vue-router';

import { ElButton } from 'element-plus';

import { CountdownButton } from '#/components';
import { isProd } from '#/utils';

import { useRegisterStore } from '../store';

const store = useRegisterStore();
const router = useRouter();

const nextStep = () => store.nextStep();
</script>

<template>
  <div class="h-full bg-white p-5">
    <div class="mb-5 text-center text-2xl font-bold">挂号服务须知</div>
    <div>
      尊敬的各位家长:
      我院实行非急诊号全预约挂号和就诊自助签到，请仔细阅读以下服务条款。
    </div>
    <ul class="ul">
      <li class="text-red-500">
        1.每日号源更新时间:预约号每晚19:00、当日号早上7:00。
      </li>
      <li>
        2.预约周期:普通、专家医生可提前1-7天预约，特需医生可提前1-30天预约。同一患者一天所有预约渠道最多预约3个不同科别的号，每个科别只能预约1名医生。
      </li>
      <li>
        3.签到时间:
        <span class="text-red-500">
          就诊当日于预约时段前30分钟内到达院“自助签到处或自助挂号机”签到，请按序号就诊
        </span>
      </li>
      <li>
        4.迟到规则:超过预约时段10分钟签到，则系统自动排至最后一位。
        <p class="text-red-500">签到时间满足以下任意一条，此次预约作废:</p>
        <p class="text-red-500">①超过预约时段1小时</p>
        <p class="text-red-500">
          ②上午号超过11:30，下午号超过17:00，前夜号超过23:30，后夜号超过01:00
        </p>
      </li>
      <li>
        5.退号时间:每个患者30天内最多可退号3次，若超过3次，则暂停预约挂号90天。
        <p>
          ①预约号:就诊前一天23:40前通过原预约渠道进行退号(自助挂号机预约号需到门诊退号窗口办理)，逾期则不退费。
        </p>
        <p>
          ②当日号:上午号在12:00前、下午号在17:30前通过原挂号渠道进行退号(线上预约号需未签到、自助机预约号需到门诊退号窗口办理)，逾期则不退费
        </p>
      </li>
      <li>
        6.爽约规则:挂号后未退号亦未到现场签到(包括因迟到无法签到)者视为爽约，30天内最多爽约3次，如超过3次，则暂停预约挂号90天。
      </li>
      <li>
        7.停换诊:预约成功后，若医生因故不能按时接诊由其他医生替诊的，系统会自动推送停换诊消息，若您同意换诊，请点击换号并付费，则保留原预约就诊序号，原挂号费自动返回您账户;若您不愿意接受换诊医生的诊疗，请点击退号。若无换诊医生，则需退号后另行预约，不便之处敬请谅解。
      </li>
    </ul>
    <div class="mt-5 font-bold text-red-500">
      请仔细阅读上述条款，点击“同意”后方可进入预约挂号页面。
    </div>
    <CountdownButton
      :countdown="isProd() ? 5 : 0"
      class="mt-5 flex w-full justify-center gap-5"
    >
      <template #counting="{ remaining }">
        <ElButton size="large" disabled class="w-[350px]">
          请仔细阅读{{ remaining }}s
        </ElButton>
      </template>
      <template #default>
        <ElButton size="large" class="w-[210px]" @click="router.back">
          不同意
        </ElButton>
        <ElButton
          size="large"
          type="primary"
          class="w-[210px]"
          @click="nextStep"
        >
          同意
        </ElButton>
      </template>
    </CountdownButton>
  </div>
</template>

<style scoped lang="scss">
.ul {
  li {
    margin-top: 10px;
    line-height: 27px;
  }
}
</style>
