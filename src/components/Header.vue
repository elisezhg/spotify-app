<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLanguage(newLanguage: string) {
  locale.value = newLanguage.toLowerCase()
}
</script>

<template>
  <header>
    <h1>{{ t('header.app-name') }}</h1>
    <button class="btn language-toggle-btn" @click="changeLanguage(t('header.language-switch'))">
      {{ t('header.language-switch') }}
    </button>
    <div class="separator desktop" />
    <a class="btn spotify-redirect-btn desktop" href="https://open.spotify.com/" target="_blank"
      >{{ t('header.open-spotify-btn-label') }}
    </a>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1.25rem;
}

header > :first-child {
  flex-grow: 1;
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
</style>
