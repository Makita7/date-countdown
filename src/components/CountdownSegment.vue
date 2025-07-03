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
    <div class="number-wrapper">
      <span class="number">{{ number }}</span>
    </div>
    <span class="block pt-2 label">{{ label }}</span>
  </div>
</template>


<style scoped>
.segment {
  text-align: center;
  width: 80px;
}
.number-wrapper {
  position: relative;
  padding-top: 2.5rem; /* pt-10 */
  overflow: hidden;
}
.number {
  transform: translateX(-50%);
  font-size: 32px;
  position: absolute;
  top: 0;
  left: 50%;
}
.label {
  font-size: 16px;
}
</style>
