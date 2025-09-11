<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Upload tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="2" :key="photo.filepath" v-for="photo in photos">
            <ion-thumbnail>
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-thumbnail>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonTabButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { camera, close, images, trash } from "ionicons/icons";

import { TakenPhoto, usePhotoGallery } from "@/composables/usePhotoGallery";

const { photos, takePhoto } = usePhotoGallery();
</script>
