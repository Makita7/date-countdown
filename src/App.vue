<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ToggleBtn from './components/ToggleBtn.vue';

let darkMode = ref(false);

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
};

let monthMode = ref(false);

function toggleMonthMode() {
  monthMode.value = !monthMode.value;
};

</script>

// TODO:
//   - make it so that you can toggle between two types, with months or defineAsyncComponent
//   - make pinia store with all the data and use local storage to store data, maybe change it for api
//   - choose bg image and toggle dark mode
//   - VueUse to us local storage and to make some sort of interesting interaction
//   - make dialog to edit and save new date for the countdown clock

<template>
  <Transition name="fade" mode="out-in">
    <header class="d-flex justify-between align-center">
      <p class="logo">Coundown || Date</p>
      <nav class="d-flex align-center">
        <img v-if="!darkMode" src="@/assets/icon-sun-filled.png" alt="light mode on" class="icon" />
        <img v-else src="@/assets/icon-sun.png" alt="light mode off" class="icon" />
        <ToggleBtn @toggleEmit="toggleDarkMode" />
        <img v-if="!darkMode"  src="@/assets/icon-moon.png" alt="dark mode off" class="icon moon" />
        <img v-else src="@/assets/icon-moon-filled.png" alt="dark mode on" class="icon moon" />
        <RouterLink to="/" class="link ml-2">Home</RouterLink>
      </nav>
    </header>
  </Transition>

  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>

  <div class="d-flex align-center justify-between mt-10">
    <button class="d-flex align-center addNew"><span>+</span> New Date</button>

    <div class="d-flex align-center monthToggle">
      <p class="mr-2">Days</p>
      <ToggleBtn @toggleEmit="toggleMonthMode" />
      <p class="ml-2">Month</p>
    </div>
  </div>
</template>

<style scoped>

header{
  background-color: #ffffffba;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
}

.logo{
  font-size: 1.2rem;
  font-weight: bold;
}

.link{
  text-decoration: none;
  color: black;
  padding: 0 0.5rem;
  transition: 0.2s all ease-in-out;
}
.link:hover{
  font-weight: bold;
  font-size: 1.05rem;
}

.moon{
  max-width: 2rem;
  max-height: 1.5rem;
  padding: 0.5rem;
}

.monthToggle{
  background-color: #ffffffba;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
}

.addNew{
  background-color: #ffffffba;
  border: none;
  padding: 0rem 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  height: 3rem;
}

button.d-flex.align-center.addNew:hover {
    background-color: #feedcb;
    font-weight: bold;
}

button.d-flex.align-center.addNew:active {
    background-color: #edcf92;
}

.addNew span{
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

</style>
