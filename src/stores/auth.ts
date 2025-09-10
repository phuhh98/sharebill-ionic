import { defineStore } from "pinia";
import type { User } from "firebase/auth";

interface State {
  currentUser: User | null;
}

export const useFirebaseAuth = defineStore("firebaseAuth", {
  state: () =>
    ({
      currentUser: null,
    } as State),
  getters: {
    user: (state) => state.currentUser,
    isAuthenticated: (state) => !!state.currentUser,
  },
  actions: {
    setUser(user: User) {
      this.currentUser = user;
    },
    clearUser() {
      this.currentUser = null;
    },
  },
});
