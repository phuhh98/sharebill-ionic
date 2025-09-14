<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Share tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Share tab</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Share tab" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import ExploreContainer from "@/components/ExploreContainer.vue";

import { usePayers } from "../stores/payers";
import { useReceipt } from "../stores/receipt";
import { useShares } from "../stores/shares";

import { onUpdated, watch } from "vue";
import { storeToRefs } from "pinia";

const payerStore = usePayers();
const { payerIds } = storeToRefs(payerStore);
const receiptStore = useReceipt();
const { itemIds } = storeToRefs(receiptStore);
const sharesStore = useShares();

watch(
  [payerIds, itemIds],
  () => {
    console.log("triggered");
    // sync share store with update from payer list and items list
    sharesStore.syncNewPayersOrItemIds(payerIds.value, itemIds.value);
  },
  { immediate: true }
);
</script>
