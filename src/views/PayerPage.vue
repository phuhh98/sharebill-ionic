<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Payers</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Payers</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <form @submit.prevent="handleAddPayer">
            <ion-input
              placeholder="Input a payer name"
              type="text"
              class="addPayer"
              v-model="payerName"
            >
              <ion-button type="submit" slot="end" size="default"
                >Add</ion-button
              >
            </ion-input>
          </form>
        </ion-toolbar>
      </ion-header>

      <ion-list v-for="payer in payerStore.payerList" :key="payer.id">
        <ion-item-sliding>
          <ion-item class="payerItem">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <span class="tw:text-2xl">
                    {{ payer.name }}
                  </span>
                </ion-col>
                <ion-col>
                  <span class="tw:text-xl">{{
                    formatCurrency(
                      receiptData.currency,
                      calculation.moneySharePerPayerId[payer.id]
                    )
                  }}</span>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-item-options side="end">
            <!-- <ion-item-option>Edit</ion-item-option> -->
            <ion-item-option color="danger" @click="handleDeletePayer(payer.id)"
              >Delete</ion-item-option
            >
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {} from "ionicons";
import { storeToRefs } from "pinia";
import { v4 as uuidV4 } from "uuid";

import { useCalculateShares } from "@/composables/useCalculateShare";
import { formatCurrency } from "@/lib/currency";
import { usePayers } from "@/stores/payers";
import { useReceipt } from "@/stores/receipt";

const payerStore = usePayers();
const receiptStore = useReceipt();

const { receiptData } = storeToRefs(receiptStore);

const payerName = defineModel("payerName", {
  type: String,
});

const { calculation } = useCalculateShares();

const handleAddPayer = () => {
  if (!payerName.value) {
    return;
  }

  payerStore.addPayer({
    id: uuidV4(),
    name: payerName.value.trim(),
  });

  payerName.value = "";
};

const handleDeletePayer = (payerId: string) => {
  payerStore.removePayer(payerId);
};
</script>

<style>
ion-input.addPayer {
  --background: var(--tw-color-gray-200);
  --padding-start: 1rem;
  --padding-end: 1rem;
}

ion-item.payerItem {
  --min-height: 4rem;
}
</style>
