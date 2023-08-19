import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'

function useQueryGet(endpoint: string) {
  return useQuery({
    queryKey: ['me', endpoint],
    queryFn: () =>
      axios.get(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }),
    select: (response: any) => response.data,
    retry: 0,
    enabled: false
  })
}

export function getUserInfo() {
  return useQueryGet('v1/me')
}

export function getUserPlaylists() {
  return useQueryGet(`v1/me/playlists`)
}

export function getUserTracks() {
  return useQueryGet(`v1/me/tracks`)
}

function fetchTokenQuery() {
  const code = new URLSearchParams(window.location.search).get('code')!
  const codeVerifier = localStorage.getItem('code_verifier')!

  return axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: import.meta.env.VITE_LOCALHOST_URI,
      client_id: import.meta.env.VITE_CLIENT_ID,
      code_verifier: codeVerifier
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export function fetchToken(callback: (response: any) => void) {
  return useMutation(fetchTokenQuery, {
    onSuccess: callback
  }).mutate()
}
