<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NavLinksDesktop from '@/components/NavLinksDesktop.vue'
import NavLinksMobile from '@/components/NavLinksMobile.vue'
import { inject } from 'vue'
import type IsLoggedInType from '@/types/is-logged-in'

const { isLoggedIn } = inject('isLoggedIn') as IsLoggedInType

const { t, locale } = useI18n()

function changeLanguage(newLanguage: string) {
  locale.value = newLanguage.toLowerCase()
}
</script>

<template>
  <header>
    <h1>{{ t('header.app-name') }}</h1>
    <div class="header-items">
      <div class="header-btns">
        <button
          class="btn language-toggle-btn"
          @click="changeLanguage(t('header.language-switch'))"
        >
          {{ t('header.language-switch') }}
        </button>
        <div :class="!isLoggedIn ? 'separator hide-tablet' : 'separator'" />
        <a
          class="btn spotify-redirect-btn hide-tablet hide-mobile"
          href="https://open.spotify.com/"
          target="_blank"
          >{{ t('header.open-spotify-btn-label') }}
        </a>
        <NavLinksMobile v-if="isLoggedIn" />
      </div>
      <NavLinksDesktop v-if="isLoggedIn" class="hide-mobile hide-tablet" />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 1.25rem;
}

.header-items {
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.header-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.language-toggle-btn {
  background-color: transparent;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02rem;
}

.separator {
  border-right: 1px solid var(--color-white);
  height: 2rem;
}

.spotify-redirect-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 1.25rem;
  background: var(--color-gray);
  color: var(--color-white);
  text-decoration: none;
}

h1 {
  font-size: 1.75rem;
}

@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
