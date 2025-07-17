import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
export interface CounterDates{
  title: string,
  date: Date,
  to: String,
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


  const formattedNewYearsDate = ref();

  function getNewYear(){
    const today = new Date();
    const nextYear = today.getFullYear() + 1;
    formattedNewYearsDate.value = new Date(`${nextYear}-01-01`);
    const newYearsDate = new Date(`${nextYear}-01-01`);
    formattedNewYearsDate.value = newYearsDate.toISOString().split('T')[0];

    addDate("New Year", formattedNewYearsDate.value as Date);
  }

  onMounted(() => {
    getNewYear();
  })

  let Dates = ref<CounterDates[]>([]);

  const formatTo = (to:String) => {
    let res = to;
    res = res.toLocaleLowerCase();
    res = res.replace(/ /g, "-");
    return res;
  }

  function addDate(title:string, date:Date){
    const dateFromInput = new Date(`${date}T00:00:00`);

    Dates.value.push({
      title: title,
      date: dateFromInput,
      to: formatTo(title),
    })
  }

  function deleteDate(title:string){
    Dates.value.filter(date => date.title === title);
  }

  function changeData(title:string, date:string){
    const index = Dates.value.findIndex(date => date.title === title);
    const dateFromInput = new Date(date + "T00:00");

    Dates.value[index] = {
      title: title,
      date: dateFromInput,
      to: formatTo(title),
    }
  }

  return { isDark, toggleDark, monthMode, toggleMonthMode, formattedNewYearsDate, addDate, deleteDate, changeData, Dates }
})
