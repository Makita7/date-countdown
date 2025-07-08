<script setup>
import { defineComponent, defineProps } from 'vue';
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();

defineComponent({
  name: "CountdownSegment",
});

defineProps({
  label: String,
  number: Number,
});

</script>

<template>
  <div class="segment">
    <span class="number">{{ number }}</span>
    <span class="pt-2 label" :class="{dark: store.isDark}">{{ label }}</span>
  </div>
</template>


<style scoped>
.segment{
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 3rem;
  padding: 0.6rem;
}

.number{
  font-weight: bold;
  font-size: 5rem;
  color: white;
  text-shadow: 3px 4px 10px #132647;
  transition: 1s ease-in-out all;
}

.label{
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 600;
  transition: 1s ease-in-out all;
}

.dark .label{
  color: white;
}

</style>
