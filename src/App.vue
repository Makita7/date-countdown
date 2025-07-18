<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from './stores/counter';
import { useDialogsStore } from './stores/dialogs';
import ToggleBtn from './components/ToggleBtn.vue';
import AddDateDialogComp from './components/AddDateDialogComp.vue';
import EditDateDialogComp from './components/EditDateDialogComp.vue';
import { useRoute } from 'vue-router';

const store = useCounterStore();
const dialogStore = useDialogsStore();
const route = useRoute();

</script>

<template>
  <div class="BG" :class="store.isDark === true ? 'darkBG' : 'lightBG'">
  <div class="BG-inner">
    <header class="d-flex justify-between align-center" :class="{dark: store.isDark}">
      <RouterLink to="/" class="logo" :class="{dark: store.isDark}">
        <i>Coundown</i> // <b><i>Date</i></b>
      </RouterLink>
      <nav class="d-flex align-center">
        <div class="d-flex align-center" :class="{darkToggle: store.isDark}">
          <img v-if="!store.isDark" src="@/assets/icon-sun-filled.png" alt="light mode on" class="icon" />
          <img v-else src="@/assets/icon-sun.png" alt="light mode off" class="icon" />
          <ToggleBtn @toggleEmit="store.toggleDark" />
          <img v-if="!store.isDark"  src="@/assets/icon-moon.png" alt="dark mode off" class="icon moon" />
          <img v-else src="@/assets/icon-moon-filled.png" alt="dark mode on" class="icon moon" />
        </div>
        <RouterLink v-for="date in store.Dates" :key="`${date.title}, ${date.date}`" :to="`/${date.to}`" class="link ml-2">{{date.title}}</RouterLink>
      </nav>
    </header>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </transition>
    </router-view>

    <EditDateDialogComp v-if="dialogStore.editDialog" @close-dialog="dialogStore.toggleEditDialog" />

    <div class="bottomSection d-flex align-center justify-between" :class="[{dark: store.isDark}, {'mt-10': route.path !== '/'}]">
      <button @click="dialogStore.toggleAddDialog" class="d-flex align-center addNew"><span>+</span> New Date</button>
      <AddDateDialogComp v-if="dialogStore.addDialog" @closeDialog="dialogStore.toggleAddDialog"/>

      <div v-if="route.path !== '/'" class="d-flex align-center monthToggle">
        <p class="mr-2">Days</p>
        <ToggleBtn @toggleEmit="store.toggleMonthMode" />
        <p class="ml-2">Month</p>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.BG{
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  transition: all 1s ease-in-out;
  animation: fadeIn ease-in-out 1s;
}

.BG-inner{
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.lightBG{
    background-image: url(@/assets/bg-light.jpg);
    background-color: white;
}

.darkBG{
  background-image: url(@/assets/bg-dark.jpg);
}
</style>

<style scoped>
header{
  background-color: #ffffffba;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  transition: all 1s ease-in-out;
  animation: fadeIn ease-in-out 1s;
}

header.d-flex.justify-between.align-center.dark{
  background-color: #242424ba;
  color: white;
}

header.d-flex.justify-between.align-center.dark .link{
  color: white;
}

.logo{
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: #1f3682;
}

.logo b{
  color: #9f5948;
}

.dark .logo {
  color: #8ea0df;
}

.dark .logo b{
  color: #db9e8f;
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

.darkToggle{
  border-radius: 10px;
  margin-left: 0.5rem;
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
  transition: 1s all ease-in-out;
}

.dark .monthToggle{
    background-color: #242424ba;
    color: white;
}

.addNew{
  background-color: #ffffffba;
  border: none;
  padding: 0rem 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  height: 3rem;
  transition: 1s all ease-in-out;
  animation: fadeIn ease-in-out;
}

.dark .addNew{
    background-color: #242424ba;
    color: white;
}

button.d-flex.align-center.addNew:hover {
    background-color: #feedcb;
    font-weight: bold;
}

button.d-flex.align-center.addNew:active {
    background-color: #edcf92;
}

.dark button.d-flex.align-center.addNew:hover {
    background-color: #4d4d56ba;
    font-weight: bold;
}

.dark button.d-flex.align-center.addNew:active {
    background-color: #8484a1ba;
}

.addNew span{
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.bottomSection {
  transition: opacity;
  animation: fadeIn ease-in-out 1s;
}

</style>
