import { defineStore } from 'pinia'
import type { PersonalUser } from '~/types/user'

interface UserState {
  user: PersonalUser | null
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    setUser(userData: PersonalUser) {
      this.user = userData
    },

    clearUser() {
      this.user = null
    },

    async updateAvatar(newAvatarUrl: string) {
      if (this.user) {
        this.user.avatar = newAvatarUrl
      }
    }
  }
})