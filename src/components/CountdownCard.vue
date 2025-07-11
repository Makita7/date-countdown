
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import CountdownSegment from "@/components/CountdownSegment.vue";
import { useRoute } from "vue-router";

const store = useCounterStore();
const route = useRoute();

// BASE DATA
let currentDate = ref<Date>();
let currentMonth = ref(0);
let currentDay = ref(0);
let currentHour = ref(0);
let currentMinutes = ref(0);
let currentSeconds = ref(0);


let remainingDays = ref(0);
let remainingDaysSimple = ref(0);
let previousDay = ref((new Date).getDate());

let thisDate = ref<any[]>([]);
let thisTitle = ref();
let month = ref(0);
let days = ref(0);
let hours = ref(0);
let minutes = ref(0);
let seconds = ref(0);

function getRemainingDays(){
    const cumulativeDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    remainingDays.value =  cumulativeDays[currentMonth.value + 1] - days.value;
}

const getData = () => {
    // get current Date
    currentDate.value = new Date();
    if (currentDate.value instanceof Date) {
        currentMonth.value = currentDate.value.getMonth();
        currentDay.value = currentDate.value.getDate();
        currentHour.value = currentDate.value.getHours();
        currentMinutes.value = currentDate.value.getMinutes();
        currentSeconds.value = currentDate.value.getSeconds();
        const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 31, 30, 31];

        if(month.value - currentMonth.value > 0){
            remainingDaysSimple.value = daysMonths[currentMonth.value + 1] - currentDay.value;
        }
    }

    if (currentDay.value !== previousDay.value) {
        previousDay.value = currentDay.value;
        getRemainingDays();
    }


    // getting data from saved Date
    thisDate.value = store.Dates.filter(d => `/${d.to}` === route.path);
    thisTitle.value = store.Dates.filter(d => `/${d.to}` === route.path)[0].title;
    month.value = thisDate.value[0].date.getMonth();
    days.value = thisDate.value[0].date.getDate();
    hours.value = thisDate.value[0].date.getHours();
    minutes.value = thisDate.value[0].date.getMinutes();
    seconds.value = thisDate.value[0].date.getSeconds();

}


onMounted(() => {
    getData();
    getRemainingDays();

    setInterval(() => {
        getData();
    }, 1000);

});


</script>

<template>
    <div class="countdown-box" :class="{dark: store.isDark}">
        <h1 class="text-center mt-2 mb-2">{{ thisTitle }}</h1>
        {{ thisDate }}
        <main class="d-flex justify-center mt-1">
            <CountdownSegment v-if="store.monthMode" data-test="months" label="months" :number="month - currentMonth" />
            <CountdownSegment v-if="store.monthMode" data-test="days" label="days" :number="remainingDaysSimple" />
            <CountdownSegment v-else data-test="days" label="days" :number="remainingDays" />
            <CountdownSegment data-test="hours" label="hours" :number="(24 - currentHour) % 24" />
            <CountdownSegment data-test="minutes" label="minutes" :number="(60 - currentMinutes) % 60" />
            <CountdownSegment data-test="seconds" label="seconds" :number="(60 - currentSeconds) % 60" />
        </main>
    </div>
</template>


<style scoped>
.countdown-box {
    position: relative;
    padding: 1.25rem;
    border-radius: 0.5rem;
    width: fit-content;
    margin: auto;
    transition: opacity;
    animation: fadeIn ease-in-out 1s;
}

.countdown-box .dark{
    color: white;
}

h1{
    transition: 1s ease-in-out all;
}

.dark h1{
    color: white;
}
</style>