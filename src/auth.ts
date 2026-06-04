import { setAccessKeys } from 'sava-test'

const TOKEN = 'techzy-auth'
const KEYS = 'techzy-keys'
const VALID_EMAIL = 'd.savaneli@techzy.app'
const VALID_PASSWORD = 'Asdasd!23'

// Mock backend — edit these to test role-based hiding (e.g. just ['CodeGenerator']).
const MOCK_ACCESS_KEYS = ['CodeGenerator', 'ContentCreator', 'Analyst', 'SystemUserManager']

export interface User {
  email: string
  accessKeys: string[]
}

const tokenStore = () =>
  localStorage.getItem(TOKEN) ? localStorage : sessionStorage.getItem(TOKEN) ? sessionStorage : null

export const auth = {
  isAuthed: () => Boolean(localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)),

  /** Mock of the backend `getUser` — replace with a real fetch later. */
  async getUser(): Promise<{ isError: boolean; errorMessage: string | null; response: User }> {
    return {
      isError: false,
      errorMessage: null,
      response: { email: VALID_EMAIL, accessKeys: MOCK_ACCESS_KEYS },
    }
  },

  /** Returns true on success. `keep` persists across browser sessions, else session-only. */
  async login(login: string, password: string, keep: boolean) {
    const ok = login.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD
    if (!ok) return false
    const store = keep ? localStorage : sessionStorage
    store.setItem(TOKEN, '1')
    const { response } = await auth.getUser()
    store.setItem(KEYS, JSON.stringify(response.accessKeys))
    setAccessKeys(response.accessKeys) // publish roles → menu + guards reflect them
    return true
  },

  /** Re-publish the stored roles on app start, so the menu + guards work after a refresh. */
  restore() {
    const store = tokenStore()
    if (!store) return
    try {
      setAccessKeys(JSON.parse(store.getItem(KEYS) ?? '[]'))
    } catch {
      setAccessKeys([])
    }
  },

  logout() {
    for (const s of [localStorage, sessionStorage]) {
      s.removeItem(TOKEN)
      s.removeItem(KEYS)
    }
    setAccessKeys([])
  },
}
