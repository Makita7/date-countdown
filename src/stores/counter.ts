import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
export interface CounterDates{
  title: string,
  date: Date,
}

export const useCounterStore = defineStore('counter', () => {

  let isDark = ref(false);

  function toggleDark() {
    isDark.value = !isDark.value;
  };

  let monthMode = ref(false);

  function toggleMonthMode() {
    monthMode.value = !monthMode.value;
  };


  const formattedNewYearsDate = ref<Date>();

  function getNewYear(){
    const today = new Date();
    const nextYear = today.getFullYear() + 1;
    formattedNewYearsDate.value = new Date(`${nextYear}-01-01`);
    // const newYearsDate = new Date(`${nextYear}-01-01`);
    // formattedNewYearsDate.value = newYearsDate.toISOString().split('T')[0];

    addDate("New Year", formattedNewYearsDate.value as Date);
  }

  onMounted(() => {
    getNewYear();
  })

  let Dates = ref<CounterDates[]>([]);

  function addDate(title:string, date:Date){
    const dateFromInput = new Date(date);

    Dates.value.push({
      title: title,
      date: dateFromInput,
    })
  }

  function deleteDate(title:string){
    Dates.value.filter(date => date.title === title);
  }

  function changeData(title:string, date:string){
    const index = Dates.value.findIndex(date => date.title === title);
    const dateFromInput = new Date(date);

    Dates.value[index] = {
      title: title,
      date: dateFromInput,
    }
  }

  return { isDark, toggleDark, monthMode, toggleMonthMode, formattedNewYearsDate, addDate, deleteDate, changeData, Dates }
})
