import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {

  let isDark = ref(false);

  function toggleDark() {
    isDark.value = !isDark.value;
  };

  let monthMode = ref(false);

  function toggleMonthMode() {
    monthMode.value = !monthMode.value;
  };

  return { isDark, toggleDark, monthMode, toggleMonthMode }
})
