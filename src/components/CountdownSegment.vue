<script setup>
import { defineComponent, defineProps } from 'vue';

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
    <span class="pt-2 label">{{ label }}</span>
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
}

.label{
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 600;
}

</style>
