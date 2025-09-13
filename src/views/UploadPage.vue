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
          <ion-col size="6" :key="photo.filename" v-for="photo in photos">
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

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="handleImageUpload">
          <ion-icon :icon="sparkles"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Capacitor } from "@capacitor/core";
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { add, camera, images, sparkles } from "ionicons/icons";
import { v4 as uuidV4 } from "uuid";

import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { webPathToBlob } from "@/lib/blob";
import { useFirebaseAuth } from "@/stores/auth";

import { useReceipt } from "../stores/receipt";
import { ReceiptDataRes } from "../types/receipt.type";

const { photos, pickFromGallary, takePhoto } = usePhotoGallery();
const authStore = useFirebaseAuth();
const receiptStore = useReceipt();

async function handleImageUpload() {
  const formBody = new FormData();
  console.log(photos.value);

  for (const photo of photos.value) {
    if (!photo.webviewPath) {
      continue;
    }

    const blob = await webPathToBlob(photo.webviewPath);

    console.log(blob);
    if (!blob) return;
    formBody.append("files", blob, photo.filename);
  }

  console.log(formBody);

  const res: Response | void = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/llm/receipt-extractor`,
    {
      body: formBody,
      headers: {
        Authorization: `Bearer ${await authStore.user?.getIdToken()}`,
      },
      method: `POST`,
    }
  ).catch((err) => {
    console.error(err);
  });

  if (!res) {
    console.log("fetch receipt extractor failed");
    return;
  } else {
    const resJSON: ReceiptDataRes = await res.json();

    if (resJSON.status == 200) {
      const itemsWithIds = resJSON.data.receipt.items.map((item) => {
        return {
          ...item,
          id: uuidV4(),
        };
      });

      receiptStore.setReceiptData({
        ...resJSON.data.receipt,
        items: itemsWithIds,
      });
    }
  }
}
</script>

<style>
ion-thumbnail {
  --size: 9rem;
  /* --border-radius: 20px; */
}
</style>
