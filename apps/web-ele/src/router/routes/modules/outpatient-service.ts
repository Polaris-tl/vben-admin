import type { RouteRecordRaw } from 'vue-router';

// import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '门诊服务',
    },
    name: 'outpatient-service',
    path: '/outpatient-service',
    children: [
      {
        name: 'register',
        path: '/outpatient-service/register',
        component: () =>
          import('#/views/outpatient-service/register/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '预约挂号',
        },
      },
    ],
  },
];

export default routes;
