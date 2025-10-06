import { defineStore } from "pinia";

interface State {
  isOpen: boolean;
  message: string;
  safe: boolean;
}

export const useToastStore = defineStore("toast", {
  actions: {
    dismissToast() {
      this.isOpen = false;
      this.message = "";
      this.safe = true;
    },
    showToast({ message, safe }: { message: string; safe: boolean }) {
      this.isOpen = true;
      this.message = message;
      this.safe = safe;
    },
  },
  state: () =>
    ({
      isOpen: false,
      message: "",
      safe: true,
    } as State),
});
