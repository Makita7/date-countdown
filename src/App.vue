<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <Transition name="fade" mode="out-in">
    <header class="d-flex justify-between align-center">
      <p class="logo">Coundown || Date</p>
      <nav>
        <RouterLink to="/" class="link">Home</RouterLink>
      </nav>
    </header>
  </Transition>

  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>
</template>

<style scoped>

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

</style>
