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
            <span class="tw:text-2xl">
              {{ payer.name }}
            </span>
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
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {} from "ionicons";
import { v4 as uuidV4 } from "uuid";

import { usePayers } from "@/stores/payers";

const payerStore = usePayers();

const payerName = defineModel("payerName", {
  type: String,
});

const handleAddPayer = () => {
  if (!payerName.value) {
    return;
  }

  payerStore.addPayer({
    id: uuidV4(),
    name: payerName.value,
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
