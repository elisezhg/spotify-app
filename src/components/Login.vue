<script lang="ts">
import { generateRandomString, hashString, encodeBase64 } from '../utils/strings'

export default {
  methods: {
    async login() {
      const codeVerifier = generateRandomString(import.meta.env.VITE_CODE_VERIFIER_LENGTH)
      const codeChallenge = await hashString(codeVerifier)
      const encodedCodeChallenge = encodeBase64(codeChallenge)

      localStorage.setItem('code_verifier', codeVerifier)

      let state = generateRandomString(import.meta.env.VITE_STATE_LENGTH)

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: import.meta.env.VITE_USER_SCOPE,
        redirect_uri: import.meta.env.VITE_LOCALHOST_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: encodedCodeChallenge
      })

      window.location.href = 'https://accounts.spotify.com/authorize?' + args
    }
  }
}
</script>

<template>
  <h1>Login page</h1>
  <button class="login-btn" @click="login">Login with Spotify</button>
</template>

<style scoped>
.login-btn {
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: black;
  color: white;
}

.login-btn:hover {
  cursor: pointer;
}
</style>
