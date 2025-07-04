
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import CountdownSegment from "@/components/CountdownSegment.vue";

const store = useCounterStore();

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

function getRemainingDays(){
    const cumulativeDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    remainingDays.value = cumulativeDays[currentMonth.value + 1] - currentDay.value;
}


const getData = () => {
    currentDate.value = new Date();
    if (currentDate.value instanceof Date) {
        currentMonth.value = currentDate.value.getMonth();
        currentDay.value = currentDate.value.getDate();
        currentHour.value = currentDate.value.getHours();
        currentMinutes.value = currentDate.value.getMinutes();
        currentSeconds.value = currentDate.value.getSeconds();
        const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 31, 30, 31];
        remainingDaysSimple.value = daysMonths[currentMonth.value + 1] - currentDay.value;
    }

    if (currentDay.value !== previousDay.value) {
        previousDay.value = currentDay.value;
        getRemainingDays();
    }
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
    <div class="countdown-box">
        <h1 class="text-center">New Years Countdown</h1>
        <main class="d-flex justify-center">
            <CountdownSegment v-if="store.monthMode" data-test="days" label="months" :number="12-currentMonth" />
            <CountdownSegment v-if="store.monthMode" data-test="days" label="days" :number="remainingDaysSimple" />
            <CountdownSegment v-else data-test="days" label="days" :number="remainingDays" />
            <CountdownSegment data-test="hours" label="hours" :number="(24 - currentHour) % 24" />
            <CountdownSegment data-test="minutes" label="minutes" :number="(60 - currentMinutes) % 60" />
        <Transition name="fade" mode="out-in">
            <CountdownSegment data-test="seconds" label="seconds" :number="(60 - currentSeconds) % 60" />
        </Transition>
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
}
</style>