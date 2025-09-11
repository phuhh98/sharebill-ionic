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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
