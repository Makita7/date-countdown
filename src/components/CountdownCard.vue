
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import CountdownSegment from "@/components/CountdownSegment.vue";
import { useRoute } from "vue-router";

const store = useCounterStore();
const route = useRoute();

const timeLeft = ref({
    totalDays: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
});

let thisTitle = ref("");
let targetDate: Date | null = null;
let interval: number;

function calculateCountdown(){
    const now = new Date();
    if(!targetDate) return;

    const diffMs = targetDate.getTime() - now.getTime();

    if(diffMs <= 0){
        timeLeft.value = { totalDays: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, };
        clearInterval(interval);
        return;
    }

    const { months, days } = getMonthAndDayDiff(now, targetDate);

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalDays = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timeLeft.value = { totalDays, months, days, hours, minutes, seconds };
}

function getMonthAndDayDiff(from: Date, to: Date) {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth() + years * 12;
    let dateClone = new Date(from);
    dateClone.setMonth(dateClone.getMonth() + months);

    let days = Math.round((to.getTime() - dateClone.getTime()) / (1000 * 60 * 60 * 24));

    if (days < 0) {
        months -= 1;
        dateClone.setMonth(dateClone.getMonth() - 1);
        days = Math.round((to.getTime() - dateClone.getTime()) / (1000 * 60 * 60 * 24));
    }

    return { months, days };
}


onMounted(() => {
    const match = store.Dates.find(d => `/${d.to}` === route.path);

    if(match){
        targetDate = new Date(match.date);
        thisTitle.value = match.title;
        calculateCountdown();
        interval = setInterval(calculateCountdown, 1000);
    }
})

onUnmounted(() => {
    clearInterval(interval);
})

</script>

<template>
    <div class="countdown-box" :class="{dark: store.isDark}">
        <h1 class="text-center mt-2 mb-2">{{ thisTitle }}</h1>
        <main class="d-flex justify-center mt-1">
            <CountdownSegment v-if="store.monthMode" data-test="months" label="months" :number="timeLeft.months" />
            <CountdownSegment v-if="store.monthMode" data-test="days" label="days" :number="timeLeft.days" />
            <CountdownSegment v-else data-test="days" label="days" :number="timeLeft.totalDays" />
            <CountdownSegment data-test="hours" label="hours" :number="timeLeft.hours" />
            <CountdownSegment data-test="minutes" label="minutes" :number="timeLeft.minutes" />
            <CountdownSegment data-test="seconds" label="seconds" :number="timeLeft.seconds" />
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