<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Receipt tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Receipt tab</ion-title>
        </ion-toolbar>
      </ion-header>

      <pre class="tw:text-xs"
        >{{ JSON.stringify(receiptData, null, 2) }}
      </pre>
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

import { useReceipt } from "@/stores/receipt";
import { storeToRefs } from "pinia";

const receiptStore = useReceipt();
const { receiptData } = storeToRefs(receiptStore);
</script>
