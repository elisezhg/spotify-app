<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import { fetchToken, getUserInfo, getUserPlaylists, getUserTracks } from '@/services/api'
import { onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { inject } from 'vue'
import type IsLoggedInType from '@/types/is-logged-in'

const { isLoggedIn } = inject('isLoggedIn') as IsLoggedInType
const router = useRouter()

const { data: userInfo, isLoading: isUserInfoLoading, refetch: fetchUserInfo } = getUserInfo()

const {
  data: userPlaylists,
  isLoading: isUserPlaylistsLoading,
  refetch: fetchUserPlaylists
} = getUserPlaylists()

const {
  data: userTracks,
  isLoading: isUserTracksLoading,
  refetch: fetchUserTracks
} = getUserTracks()

onBeforeMount(() => {
  const code = new URLSearchParams(window.location.search).get('code')

  if (code) {
    fetchToken((response: any) => {
      localStorage.setItem('access_token', response.data.access_token)
      router.push('/')
      fetchUserInfo()
      fetchUserPlaylists()
      fetchUserTracks()
    })
  } else if (!isLoggedIn.value) {
    router.push('/login')
  } else {
    fetchUserInfo()
    fetchUserPlaylists()
    fetchUserTracks()
  }
})
</script>

<template>
  <!-- TODO: skeleton if still loading -->
  <UserInfo
    v-if="!isUserInfoLoading && !isUserPlaylistsLoading && !isUserTracksLoading"
    :user-info="userInfo"
    :user-playlists="userPlaylists"
    :user-tracks="userTracks"
  />
  <div class="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content > :last-child {
  flex: 1;
}
</style>
