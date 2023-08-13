<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import CrossIcon from '@/assets/icons/cross.svg'
import HamburgerIcon from '@/assets/icons/hamburger.svg'

const { t } = useI18n()
const router = useRouter()
const isMenuOpen = ref(false)

function handleClick(e: any) {
  const path = e.target.href.split('/').at(-1)
  router.push(path)
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function isActive(path: string) {
  return path === router.currentRoute.value.name ? 'active' : ''
}
</script>

<template>
  <nav :class="isMenuOpen ? '' : 'hide'">
    <a href="/spotify-app/stats" @click.prevent="handleClick" :class="isActive('stats')">{{
      t('navigation.stats')
    }}</a>
    <a href="/spotify-app/discover" @click.prevent="handleClick" :class="isActive('discover')">{{
      t('navigation.discover')
    }}</a>
    <a href="/spotify-app/new" @click.prevent="handleClick" :class="isActive('new')">{{
      t('navigation.whats-new')
    }}</a>
  </nav>
  <CrossIcon class="icon top-left" @click="toggleMenu" :class="isMenuOpen ? '' : 'hide'" />
  <HamburgerIcon class="icon" @click="toggleMenu" :class="isMenuOpen ? 'hide' : 'show-tablet'" />
</template>

<style scoped>
.top-left {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.icon {
  width: 40px;
  height: 40px;
}

nav {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: color-mix(in srgb, var(--color-black) 90%, transparent);
  backdrop-filter: blur(7.5px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem;
}

a {
  color: var(--color-gray);
  display: block;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: 600;
  margin: 1rem;
}

.active {
  color: var(--color-green-dark);
}

@media (hover: hover) {
  a:hover {
    transform: translateY(3px);
  }
}
</style>
