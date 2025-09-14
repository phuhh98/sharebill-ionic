<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Share tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-text v-if="receiptData.items.length == 0">
        Nothing to share right now
      </ion-text>
      <swipe-item-share></swipe-item-share>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { watch } from "vue";

import SwipeItemShare from "@/components/SwipeItemShare.vue";

import { usePayers } from "../stores/payers.ts";
import { useReceipt } from "../stores/receipt.ts";
import { useShares } from "../stores/shares.ts";

const payerStore = usePayers();
const { payerIds } = storeToRefs(payerStore);
const receiptStore = useReceipt();
const { itemIds, receiptData } = storeToRefs(receiptStore);
const sharesStore = useShares();

watch(
  [payerIds, itemIds],
  () => {
    // sync share store with update from payer list and items list
    sharesStore.syncNewPayersOrItemIds(payerIds.value, itemIds.value);
  },
  { immediate: true }
);
</script>
