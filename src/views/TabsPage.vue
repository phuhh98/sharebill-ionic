<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="upload" href="/tabs/upload">
          <ion-icon aria-hidden="true" :icon="cloudUpload" />
          <ion-label>Upload</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="receipt" href="/tabs/receipt">
          <ion-icon aria-hidden="true" :icon="receipt" />
          <ion-label>Your Receipt</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="share" href="/tabs/share">
          <ion-icon aria-hidden="true" :icon="calculator" />
          <ion-label>Share</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="payers" href="/tabs/payers">
          <ion-icon aria-hidden="true" :icon="personAdd" />
          <ion-label>Payers</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { cloudUpload, receipt, calculator, personAdd } from "ionicons/icons";
</script>
