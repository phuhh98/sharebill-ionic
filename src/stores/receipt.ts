import { defineStore } from "pinia";

import { ReceiptDetails } from "../types/receipt.type";

interface State {
  receiptData: ReceiptDetails;
}

const initState: State = {
  receiptData: {
    currency: "",
    error: null,
    items: [],
    receipt_date: "",
    total_receipt_price: 0,
  },
};

export const useReceipt = defineStore("receipt", {
  actions: {
    setReceiptData(receipt: ReceiptDetails) {
      this.receiptData = receipt;
    },
  },
  state: () => {
    return initState;
  },
});
