import { defineStore } from "pinia";

interface Payer {
  id: number | string;
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
    removePayer(payer: Payer) {
      const index = this.payerList.findIndex((item) => item.id === payer.id);
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
});
