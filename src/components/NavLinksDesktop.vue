<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

function handleClick(e: any) {
  const path = e.target.href.split('/').at(-1)
  router.push(path)
}

function isActive(path: string) {
  return path === router.currentRoute.value.name ? 'active' : ''
}
</script>

<template>
  <nav>
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
</template>

<style scoped>
nav {
  display: flex;
  align-items: flex-start;
  height: auto;
  width: auto;
  padding: 0;
}

a {
  color: var(--color-gray);
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  margin: 1rem;
  font-size: 1.25rem;
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
