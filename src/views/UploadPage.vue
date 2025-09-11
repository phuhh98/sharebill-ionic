<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Upload tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row size>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-thumbnail>
              <ion-img :src="photo.webviewPath"></ion-img>
            </ion-thumbnail>
          </ion-col>
        </ion-row>
      </ion-grid>
      <template v-if="Capacitor.getPlatform() !== 'web'">
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="start">
            <ion-fab-button @click="takePhoto()">
              <ion-icon :icon="camera"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="end">
            <ion-fab-button @click="pickFromGallary()">
              <ion-icon :icon="images"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>
      </template>

      <template v-if="Capacitor.getPlatform() === 'web'">
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button @click="takePhoto()">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </template>
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
  IonFabList,
} from "@ionic/vue";
import { Capacitor } from "@capacitor/core";
import { camera, close, images, trash, add } from "ionicons/icons";

import { TakenPhoto, usePhotoGallery } from "@/composables/usePhotoGallery";

const { photos, takePhoto, pickFromGallary } = usePhotoGallery();
</script>

<style>
ion-thumbnail {
  --size: 9rem;
  /* --border-radius: 20px; */
}
</style>
