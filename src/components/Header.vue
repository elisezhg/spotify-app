<script lang="ts">
export default {
  methods: {
    redirectToSpotify() {
      console.log('clicked')
      window.location.href = 'https://open.spotify.com/'
    }
  }
}
</script>

<template>
  <header>
    <h1>Spotify App</h1>
    <a class="spotify-redirect-btn" href="https://open.spotify.com/" target="_blank"
      >Open Spotify
    </a>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
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
