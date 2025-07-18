
<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useCounterStore } from '@/stores/counter';

defineComponent({
    name: 'NotFoundView'
})

const store = useCounterStore();

</script>

<template>
    <div class="d-flex align-center">
        <div class="notFoundCont d-flex align-center" :class="{dark: store.isDark}">
            <img src="@/assets/cute-clock.png" alt="cartoon clock not found page" />
            <div class="textCont text-center">
                <p class="nothing notFound text-center fadeIn">404</p>
                <p class="nothing detail text-center fadeIn">Page Not Found...</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.dark{
    color: white;
}

.notFoundCont{
    padding: 4rem 0 2rem 0;
    margin: 0 auto;
    transition: opacity;
    animation: fadeIn ease-in-out 1s;
}

img{
    max-width: 22rem;
}

.textCont{
    margin-left: 2rem;
}

.notFound{
    color:#863107;
    font-size: 6rem;
    font-weight: bold;
    text-shadow: 0 5px 5px rgba(0, 0, 0, 0.212);
}

.dark .notFound{
    color: #ffac82;
}

.detail{
    font-size: 1.5rem;
    font-weight: bold;
}

</style>