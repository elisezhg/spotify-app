import type { Ref } from 'vue'

export default interface IsLoggedInType {
  isLoggedIn: Ref
  setIsLoggedIn: (arg: boolean) => void
}
