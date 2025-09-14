import { defineStore } from "pinia";

interface Payer {
  id: string;
  name: string;
}

interface State {
  payerList: Payer[];
}

export const usePayers = defineStore("payers", {
  actions: {
    addPayer(payer: Payer) {
      this.payerList.push(payer);
    },
    removePayer(payerId: string) {
      const index = this.payerList.findIndex((item) => item.id === payerId);
      if (index < 0) {
        throw new Error("Payer does not exist in store");
      }

      this.payerList.splice(index, 1);
    },
  },
  state: () => {
    return {
      payerList: [],
    } as State;
  },
  getters: {
    payerIds: (state) => {
      return state.payerList.reduce((acc, payer) => {
        acc.push(payer.id);
        return acc;
      }, [] as string[]);
    },
  },
});
