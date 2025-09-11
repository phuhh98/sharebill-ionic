import type { User } from "firebase/auth";

import { defineStore } from "pinia";

interface State {
  currentUser: null | User;
}

export const useFirebaseAuth = defineStore("firebaseAuth", {
  actions: {
    clearUser() {
      this.currentUser = null;
    },
    setUser(user: User) {
      this.currentUser = user;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    user: (state) => state.currentUser,
  },
  state: () =>
    ({
      currentUser: null,
    } as State),
});
