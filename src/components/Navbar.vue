<script setup>
import {onMounted,ref} from 'vue'
import sunIcon from '@/components/icons/IconSun.vue'
import moonIcon from '@/components/icons/IconMoon.vue'
import logoIcon from '@/components/icons/IconLogo.vue'

const emit = defineEmits(['darkTheme'])

let isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value

  isDark.value ? localStorage.setItem('dark', isDark.value) 
  : localStorage.removeItem('dark')

  emit('darkTheme', isDark.value)

}

onMounted( () => {
  localStorage.getItem('dark') ? isDark.value = true : isDark.value = false
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
          <sunIcon  />
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
.nav{
  height: 100vh;
  width: 103px;
  background-color: var(--elements-clr);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.nav .logo{
  width: 100%;
  height: 103px;
  background-color: var(--primary-clr);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav .bottom__part{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.nav .bottom__part img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 15px 0;
}
.nav .bottom__part hr{
  margin-top: 15px;
  border: 1px solid #494e6e;
  width: 100%;
}
.nav .bottom__part .theme__icons:hover{cursor: pointer;}
.nav .bottom__part .theme__icons:hover svg path{fill: #DFE3FA;}
</style>