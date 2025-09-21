import { defineStore } from "pinia";

import { ReceiptDetails, ReceiptItem } from "../types/receipt.type.ts";

interface State {
  receiptData: ReceiptDetails;
}

const initState: State = {
  receiptData: {
    currency: "USD",
    error: null,
    items: [],
    receipt_date: "",
    total_receipt_price: 0,
  },
};

export const useReceipt = defineStore("receipt", {
  actions: {
    async addNewItem(newItem: ReceiptItem) {
      const index = this.receiptData.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (index >= 0) {
        return;
      }

      this.receiptData.items.push(newItem);
      await this.recalculateTotal();
    },

    async recalculateTotal() {
      const receiptTotal = this.receiptData.items.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0);

      this.receiptData.total_receipt_price = receiptTotal;
    },
    async removeAnItem(itemId: string) {
      const index = this.receiptData.items.findIndex(
        (item) => item.id === itemId
      );
      if (index < 0) {
        return;
      }

      this.receiptData.items.splice(index, 1);
      await this.recalculateTotal();
    },
    setReceiptData(receipt: ReceiptDetails) {
      this.receiptData = receipt;
    },
    async updateAnItem(updateItem: ReceiptItem) {
      const index = this.receiptData.items.findIndex(
        (item) => item.id === updateItem.id
      );

      if (index < 0) {
        return;
      }

      this.receiptData.items.splice(index, 1, updateItem);
      await this.recalculateTotal();
    },
  },
  getters: {
    itemIds: (state) => {
      return state.receiptData.items.reduce((acc, item) => {
        acc.push(item.id);
        return acc;
      }, [] as string[]);
    },
    totalReceiptPrice: (state) => {
      return state.receiptData.total_receipt_price;
    },
  },
  state: () => {
    return initState;
  },
});
