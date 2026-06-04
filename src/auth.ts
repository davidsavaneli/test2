// Minimal demo auth — hardcoded single credential. Swap for a real API later.
const KEY = 'techzy-auth'
const VALID_EMAIL = 'd.savaneli@techzy.app'
const VALID_PASSWORD = 'Asdasd!23'

export const auth = {
  /** Authenticated if a token is kept (persistent) or in the session. */
  isAuthed: () => Boolean(localStorage.getItem(KEY) || sessionStorage.getItem(KEY)),

  /** Returns true on success. `keep` → persist across browser sessions, else session-only. */
  login(login: string, password: string, keep: boolean) {
    const ok = login.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD
    if (ok) (keep ? localStorage : sessionStorage).setItem(KEY, '1')
    return ok
  },

  logout() {
    localStorage.removeItem(KEY)
    sessionStorage.removeItem(KEY)
  },
}
