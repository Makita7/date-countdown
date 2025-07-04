import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  let darkMode = ref(false);

  function toggleDarkMode() {
    darkMode.value = !darkMode.value;
  };

  let monthMode = ref(false);

  function toggleMonthMode() {
    monthMode.value = !monthMode.value;
  };

  return { darkMode, toggleDarkMode, monthMode, toggleMonthMode }
})
