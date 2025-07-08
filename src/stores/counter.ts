import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
export interface CounterDates{
  title: string,
  date: string,
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


  const formattedNewYearsDate = ref<string>("");

  function getNewYear(){
    const today = new Date();
    const nextYear = today.getFullYear() + 1;
    const newYearsDate = new Date(`${nextYear}-01-01`);
    formattedNewYearsDate.value = newYearsDate.toISOString().split('T')[0];

    addDate("New Year", formattedNewYearsDate.value);
  }

  onMounted(() => {
    getNewYear();
  })

  let Dates = ref<CounterDates[]>([
    {
      title: "New Year",
      date: formattedNewYearsDate.value,
    },
  ]);

  function addDate(title:string, date:string){
    Dates.value.push({
      title: title,
      date: date
    })
  }

  function deleteDate(title:string){
    Dates.value.filter(date => date.title === title);
  }

  function changeData(title:string, date:string){
    const index = Dates.value.findIndex(date => date.title === title);

    Dates.value[index] = {
      title: title,
      date: date,
    }
  }

  return { isDark, toggleDark, monthMode, toggleMonthMode, formattedNewYearsDate, addDate, deleteDate, changeData, Dates }
})
