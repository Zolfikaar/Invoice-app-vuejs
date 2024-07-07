<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';

let isDark = ref()
onMounted(() => {
  localStorage.getItem('dark') ? isDark.value = true : isDark.value = false
})

</script>

<template>
  <div class="box" :class="isDark ? 'dark' : ''">
    <Navbar @darkTheme="isDark = !isDark" />

    <RouterView class="main__content" />
  </div>
</template>

<style>
#app .box {
  z-index: 1;
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-clr);
}

.main__content {
  width: 80%;
  color: var(--txt-clr);
}
</style>