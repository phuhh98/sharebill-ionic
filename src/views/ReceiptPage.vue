<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Your receipt</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <shares-pie-chart></shares-pie-chart>

      <receipt-item-list></receipt-item-list>
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

import ReceiptItemList from "@/components/ReceiptItemList.vue";
import SharesPieChart from "@/components/SharesPieChart.vue";
</script>
