import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    step: 0,
    data: {
      hospital: '',
      department: '',
      doctor: '',
      time: '',
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
      this.data = { hospital: '', department: '', doctor: '', time: '' };
    },
  },
});
