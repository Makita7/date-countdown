<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();
</script>

<template>
    <div class="nothingCont fadeIn d-flex flex-col" :class="{dark: store.isDark}">
        <p class="nothing text-center fadeIn">No dates selected, choose from the navigation bar above or create a new date</p>
        <img src="@/assets/cute-calendar.png" alt="happy calendar cartoon" class="fadeIn" />
    </div>
</template>

<style scoped>
.dark{
    color: white;
}

.nothingCont{
    padding: 3rem 0 0 0;
    transition: opacity;
    animation: fadeIn ease-in-out 1s;
}

.nothing{
    font-weight: 600;
    font-size: 1.3rem;
}

img{
    max-width: 22rem;
    margin: 0 auto;
}
</style>