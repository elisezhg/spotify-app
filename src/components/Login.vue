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
  <div class="login">
    <p>Login with your Spotify account to get started!</p>
    <button class="login-btn" @click="login">Login with Spotify</button>
  </div>
</template>

<style scoped>
.login {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
}
.login-btn {
  margin-top: 4rem;
  padding: 1.25rem 3rem;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 1.75rem;
}
</style>
