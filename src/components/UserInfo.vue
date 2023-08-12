<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { userInfo, userPlaylists, userTracks } = defineProps<{
  userInfo: any
  userPlaylists: any
  userTracks: any
}>()

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: string) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
</script>

<template>
  <div v-if="userInfo && userPlaylists && userTracks" class="user-info">
    <div>
      <img :src="userInfo?.images?.pop().url" class="user-profile-picture" />
      <p class="username">
        <b>{{ userInfo.display_name }}</b>
        {{ getFlagEmoji(userInfo.country) }}
      </p>
    </div>
    <div>
      <div class="stat">
        <img src="icons/user.svg" />
        <p>{{ t('user-info.followers', userInfo.followers.total) }}</p>
      </div>
      <div class="stat">
        <img src="icons/heart.svg" />
        <p>{{ t('user-info.songs', userTracks.total) }}</p>
      </div>
      <div class="stat">
        <img src="icons/playlist.svg" />
        <p>{{ t('user-info.playlists', userPlaylists.total) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  flex: 0;
  gap: 2rem;
}

.user-info > div {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.username {
  font-size: 1.5rem;
  text-align: center;
}

.user-profile-picture {
  border-radius: 50%;
  width: 8rem;
  aspect-ratio: 1;
}

.stat {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.stat > img {
  width: 1.5rem;
}

@media (min-width: 768px) {
  .user-info {
    flex-direction: column;
    flex: 1;
    max-width: 16rem;
    margin-top: 2rem;
  }
}
</style>
