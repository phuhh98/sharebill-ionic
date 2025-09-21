<template>
  <ion-grid>
    <ion-row>
      <ion-col size="4">
        <ion-text class="tw:text-sm tw-font-bold">Overall Progress</ion-text>
      </ion-col>
      <ion-col size="8">
        <div class="tw:h-full tw:flex tw:justify-center tw:items-center">
          <ion-progress-bar
            :color="progressColor"
            :value="progress"
          ></ion-progress-bar>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script setup lang="ts">
import { IonCol, IonGrid, IonProgressBar, IonRow, IonText } from "@ionic/vue";
import * as math from "mathjs";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useCalculateShares } from "../composables/useCalculateShare";
import { useReceipt } from "../stores/receipt";

const receiptStore = useReceipt();
const { receiptData } = storeToRefs(receiptStore);

const { totalSharedAmount } = useCalculateShares();

enum CheckPoint {
  Full = 1,
  Major = 0.8,
  Minor = 0.2,
  Partial = 0.4,
}

const progressColor = computed<
  InstanceType<typeof IonProgressBar>["$props"]["color"]
>(() => {
  if (math.round(progress.value, 2) >= CheckPoint.Full) {
    return "success";
  } else if (progress.value >= CheckPoint.Major) {
    return "primary";
  } else if (progress.value >= CheckPoint.Partial) {
    return "tertiary";
  } else if (progress.value >= CheckPoint.Minor) {
    return "warning";
  } else {
    return "danger";
  }
});

const progress = computed(() =>
  receiptData.value.items.length == 0
    ? 0
    : totalSharedAmount.value / receiptData.value.total_receipt_price
);
</script>
<style></style>
