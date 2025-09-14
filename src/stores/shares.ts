import { defineStore } from "pinia";

interface Share {
  [itemId: string]: {
    [payerId: string]: number;
  };
}

interface State {
  shares: Share;
}

export const useShares = defineStore("shares", {
  actions: {
    setInitShareWithPayersAndItemIds(payerIds: string[], itemIds: string[]) {
      itemIds.forEach((itemId) => {
        this.shares[itemId] = {};
        payerIds.forEach((payerId) => {
          this.shares[itemId][payerId] = 0;
        });
      });
    },

    setShare(payerId: string, itemId: string, share: number) {
      this.shares[itemId][payerId] = share;
    },

    shareDecrease(payerId: string, itemId: string, amount: number = 1) {
      if (this.shares[itemId][payerId] == 0) {
        return;
      }
      this.shares[itemId][payerId] -= amount;
    },
    shareIncrease(payerId: string, itemId: string, amount: number = 1) {
      this.shares[itemId][payerId] += amount;
    },
    syncNewPayersOrItemIds(
      workingPayerIds: string[],
      workingItemIds: string[]
    ) {
      try {
        const sharesState = this.shares;
        // combine list of iterate itemIds
        const combinedIterateItemIds = Array.from(
          new Set([...Object.keys(sharesState), ...workingItemIds])
        );

        const oldPayerIds = new Set<string>();

        for (const item in sharesState) {
          for (const payerId in sharesState[item]) {
            oldPayerIds.add(payerId);
          }
        }

        if (combinedIterateItemIds.length < 1) {
          return;
        }

        combinedIterateItemIds.forEach((itemId) => {
          // remove non-exist in workingItemIds list from store
          if (!workingItemIds.includes(itemId)) {
            delete sharesState[itemId];
            //get out of this since it is deleted
            return;
          } else {
            // set the key of new itemId with an empty object
            if (sharesState[itemId] == undefined) {
              sharesState[itemId] = {};
            }
          }

          const combinedPayerIds = Array.from(
            new Set([...Array.from(oldPayerIds), ...workingPayerIds])
          );

          if (combinedPayerIds.length < 1) {
            return;
          }

          combinedPayerIds.forEach((payerId) => {
            // remove payerId if it does not exist in provided payerIds
            if (!workingPayerIds.includes(payerId)) {
              delete sharesState[itemId][payerId];
              return;
            } else {
              // set to 0 for new payerId
              if (sharesState[itemId][payerId] == undefined) {
                sharesState[itemId][payerId] = 0;
              }
            }
          });
        });
      } catch (err) {
        console.error(err);
      }
    },
  },

  getters: {
    indexedPayerShareSwapped(state) {
      interface IndexedSwappedShareConfig {
        // payer shares with ordered indexes
        [payerId: string]: number[];
      }

      return (orderedtemIds: string[]) => {
        const result: IndexedSwappedShareConfig = {};

        Object.keys(state.shares[0]).forEach((payerId) => {
          result[payerId] = [];

          for (const [index, itemId] of orderedtemIds.entries()) {
            result[payerId][index] = state.shares[itemId][payerId];
          }
        });

        return result;
      };
    },

    payersSharesSwapped() {
      interface SwappedShareConfig {
        [payerId: string]: {
          [itemId: string]: number;
        };
      }

      const itemIds = Object.keys(this.shares);

      if (itemIds.length) {
        return null;
      }

      if (!this.shares[itemIds[0]]) {
        return null;
      }

      const payerIds = Object.keys(this.shares[itemIds[0]]);

      if (payerIds.length == 0) {
        return null;
      }

      const result: SwappedShareConfig = {};

      payerIds.forEach((payerId) => {
        result[payerId] = {};

        itemIds.forEach((itemId) => {
          result[payerId][itemId] = this.shares[itemId][payerId];
        });
      });

      return result;
    },
  },
  state: () => {
    return { shares: {} } as State;
  },
});
