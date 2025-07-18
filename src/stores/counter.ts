import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
export interface CounterDates{
  title: string,
  date: string,
  to: String,
}

export const useCounterStore = defineStore('counter', () => {

  const router = useRouter();

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
    const alreadyExists = Dates.value.some(date => date.to === 'new-year');

    if(!alreadyExists){
      const today = new Date();
      const nextYear = today.getFullYear() + 1;
      formattedNewYearsDate.value = new Date(`${nextYear}-01-01`);
      const newYearsDate = new Date(`${nextYear}-01-01`);
      formattedNewYearsDate.value = newYearsDate.toISOString().split('T')[0];

      addDate("New Year", formattedNewYearsDate.value as Date);
    }

  }

  onMounted(() => {
    getNewYear();
  })

  const Dates = useLocalStorage<CounterDates[]>('my-dates', []);

  const formatTo = (to:String) => {
    let res = to;
    res = res.toLocaleLowerCase();
    res = res.replace(/ /g, "-");
    return res;
  }

  function addDate(title:string, date:Date){
    // const dateFromInput = new Date(`${date}T00:00:00`);

    Dates.value.push({
      title: title,
      date: `${date}T00:00:00`,
      to: formatTo(title),
    });

    router.push(`/${formatTo(title)}`);
  }

  function deleteDate(title:string){
    Dates.value = Dates.value.filter(date => date.title !== title);
  }

  function changeData(title:string, date:string, to:string){
    Dates.value = Dates.value.map(d =>
      d.to === to
        ? { title: title, date: `${date}T00:00:00`, to: to }
        : d
    )
  }

  function findDateIndex(to:string){
    return Dates.value.findIndex(date => date.to === to.replace('/',''));
  }

  return { isDark, toggleDark, monthMode, toggleMonthMode, formattedNewYearsDate, addDate, deleteDate, changeData, Dates, findDateIndex, formatTo }
})
