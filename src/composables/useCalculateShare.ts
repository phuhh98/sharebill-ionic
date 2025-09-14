import * as dfd from "danfojs";
import * as mathjs from "mathjs";
import { storeToRefs } from "pinia";
import { reactive, watch } from "vue";

import { usePayers } from "../stores/payers.ts";
import { useReceipt } from "../stores/receipt.ts";
import { useShares } from "../stores/shares.ts";

interface MoneySharePerPayerIds {
  [payerId: string]: number;
}

export const useCalculateShares = () => {
  const payerStore = usePayers();
  const receiptStore = useReceipt();
  const sharesStores = useShares();

  const { payerIds, payerList } = storeToRefs(payerStore);
  const { itemIds, receiptData } = storeToRefs(receiptStore);
  const { shares } = storeToRefs(sharesStores);

  let itemsDF = new dfd.DataFrame(receiptData.value.items);
  const moneySharePerPayerIds = reactive<{ result: MoneySharePerPayerIds }>({
    result: {},
  });

  function calculateShares() {
    if (
      Object.keys(shares.value).length < 1 ||
      payerList.value.length < 2 ||
      Object.keys(shares.value[itemIds.value[0]]).length < 2
    ) {
      return;
    }

    const itemIdsInOrdered = itemsDF.column("id");

    // now compose DF of payers
    // create object to hold payer data or ordered shares
    const payerSharesTemptHolder = payerIds.value.reduce((acc, payerId) => {
      acc[payerId] = [];
      return acc;
    }, {} as { [payerId: string]: number[] });

    // update shares to payerObject data
    itemIdsInOrdered.values.forEach((itemId, index) => {
      // search for shares of each payer and put it in correct index of payerShares
      payerIds.value.forEach((payerId) => {
        payerSharesTemptHolder[payerId][index] =
          shares.value[itemId as string][payerId];
      });
    });

    const payerSharesDF = new dfd.DataFrame(payerSharesTemptHolder);

    // console.log("payerSharesDF", payerSharesDF);

    const gcdDF = payerSharesDF.apply(
      (col: number[]) => {
        return mathjs.gcd(...col);
      },
      { axis: 1 }
    );

    let reducedPayerSharesDF = new dfd.DataFrame();
    reducedPayerSharesDF = payerSharesDF.div(
      // Normalize gcd, convert 0 to 1 to avoid division to 0
      gcdDF.apply((val: number) => {
        if (val == 0) {
          return 1;
        } else {
          return val;
        }
      }),
      { axis: 0 }
    );

    // console.log("reducedPayerShareDF", reducedPayerSharesDF);

    const calculateSharesDF = new dfd.DataFrame({
      itemId: itemIds.value,
    });

    enum CALCULATE_DF_COLUMNS {
      totalPrice = "totalPrice",
      totalShares = "totalShares",
    }
    calculateSharesDF.addColumn(
      CALCULATE_DF_COLUMNS.totalShares,
      reducedPayerSharesDF.sum({ axis: 1 }),
      { inplace: true }
    );

    calculateSharesDF.addColumn(
      CALCULATE_DF_COLUMNS.totalPrice,
      itemsDF.column("price").mul(itemsDF.column("quantity")),
      {
        inplace: true,
      }
    );

    // now calculate share per payerId
    for (const payerId of reducedPayerSharesDF.columns) {
      calculateSharesDF.addColumn(
        payerId,
        reducedPayerSharesDF
          .column(payerId)

          .div(calculateSharesDF.column(CALCULATE_DF_COLUMNS.totalShares))
          .mul(calculateSharesDF.column(CALCULATE_DF_COLUMNS.totalPrice)),
        { inplace: true }
      );
    }

    // console.log("calculateSharesDF", calculateSharesDF);
    // console.log(dfd.toJSON(calculateSharesDF));

    const moneySharePerPayerIds = reducedPayerSharesDF.columns.reduce(
      (acc, payerId) => {
        acc[payerId] = calculateSharesDF.column(payerId).sum();

        return acc;
      },
      {} as MoneySharePerPayerIds
    );

    return moneySharePerPayerIds;
  }

  watch(
    [receiptData.value.items, shares.value, payerIds],
    () => {
      itemsDF = new dfd.DataFrame(receiptData.value.items);

      try {
        const result = calculateShares();
        if (result) {
          moneySharePerPayerIds.result = result;
        }
      } catch (err) {
        console.error(err);
      }
    },
    { immediate: true }
  );

  return { itemsDF, moneySharePerPayerIds };
};
