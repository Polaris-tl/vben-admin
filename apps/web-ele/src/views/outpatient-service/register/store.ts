import { set } from '@vben/utils';

import { defineStore } from 'pinia';

interface RegisterState {
  step: number;
  data: {
    departmentL1?: RegisterApi.DeptsResponse;
    departmentL2?: Omit<RegisterApi.DeptsResponse, 'children'>;
    district?: RegisterApi.HospitalDistrictResponse;
  };
}

export const useRegisterStore = defineStore('register', {
  state: (): RegisterState => ({
    step: 0,
    data: {
      district: undefined, // 院区
      departmentL1: undefined, // 一级科室
      departmentL2: undefined, // 二级科室
    },
  }),
  actions: {
    nextStep() {
      if (this.step < 6) this.step++;
    },
    prevStep() {
      if (this.step > 0) this.step--;
    },
    reset() {
      this.step = 0;
      const newObj = {} as any;
      Object.keys(this.data).forEach((key) => {
        newObj[key] = undefined;
      });
      this.data = newObj;
    },
    setData(data: any) {
      this.data = data;
    },
    setStep2District(v: RegisterApi.HospitalDistrictResponse) {
      set(this.data, 'district', v);
    },
    setStep2DepartmentL1(v: RegisterApi.DeptsResponse) {
      set(this.data, 'departmentL1', v);
    },
    setStep2DepartmentL2(v: Omit<RegisterApi.DeptsResponse, 'children'>) {
      set(this.data, 'departmentL2', v);
    },
  },
});
