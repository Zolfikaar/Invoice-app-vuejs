<script setup>
import { onMounted, ref } from 'vue'
import sunIcon from '@/components/icons/IconSun.vue'
import moonIcon from '@/components/icons/IconMoon.vue'
import logoIcon from '@/components/icons/IconLogo.vue'

const emit = defineEmits(['darkTheme'])

let isDark = ref(false)
let body = document.querySelector('body');
const toggleTheme = () => {
  isDark.value = !isDark.value

  isDark.value ? localStorage.setItem('dark', isDark.value)
    : localStorage.removeItem('dark')

  emit('darkTheme', isDark.value)

  // applying dark theme for on body element [for proper coloring while open big modal such as newModal]
  if (isDark.value) {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')

  }
}

onMounted(() => {
  localStorage.getItem('dark') ? isDark.value = true : isDark.value = false

  if (isDark.value) {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')

  }
})

</script>

<template>
  <div class="nav dark">
    <div class="logo">
      <logoIcon />
    </div>

    <div class="bottom__part">
      <div class="theme__icons" @click="toggleTheme">
        <div v-if="isDark">
          <sunIcon />
        </div>
        <div v-else>
          <moonIcon />
        </div>
      </div>
      <hr>
      <div class="avatar">
        <img src="/image-avatar.jpg" alt="">
      </div>
    </div>
  </div>

</template>

<style>
.nav {
  position: relative;
  z-index: 5;
  height: 100vh;
  width: 103px;
  background-color: #1E2139;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.nav .logo {
  width: 100%;
  height: 103px;
  background-color: var(--primary-clr);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav .bottom__part {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.nav .bottom__part img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 15px 0;
}

.nav .bottom__part hr {
  margin-top: 15px;
  border: 1px solid #494e6e;
  width: 100%;
}

.nav .bottom__part .theme__icons:hover {
  cursor: pointer;
}

.nav .bottom__part .theme__icons:hover svg path {
  fill: #DFE3FA;
}

@media screen and (min-width: 679px) and (max-width: 1180px) {
  .nav {
    position: absolute;
    height: 80px;
    width: 100%;
    flex-direction: row;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }

  .nav .logo {
    height: 80px;
    width: 80px;
  }

  .nav .bottom__part {
    flex-direction: row;
  }

  .nav .bottom__part hr {
    margin-top: unset;
    margin-left: 20px;
    width: 1px;
    height: 80px;
  }

  .nav .bottom__part img {
    margin: 40px 20px;
  }
}

@media screen and (min-width: 320px) and (max-width: 678px) {
  .nav {
    position: absolute;
    height: 80px;
    width: 100%;
    flex-direction: row;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }

  .nav .logo {
    height: 80px;
    width: 80px;
  }

  .nav .bottom__part {
    flex-direction: row;
  }

  .nav .bottom__part hr {
    margin-top: unset;
    margin-left: 20px;
    width: 1px;
    height: 80px;
  }

  .nav .bottom__part img {
    margin: 40px 20px;
  }
}
</style>