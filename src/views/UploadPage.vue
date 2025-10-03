<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Upload</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-loading
        :is-open="isLoaderOpen"
        message="Please wait..."
        spinner="circles"
      ></ion-loading>
      <image-thumbnails></image-thumbnails>
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
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { add, camera, images, sparkles } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { v4 as uuidV4 } from "uuid";
import { ref } from "vue";
import { useRouter } from "vue-router";

import ImageThumbnails from "@/components/ImageThumbnails.vue";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { webPathToBlob } from "@/lib/blob";
import { useFirebaseAuth } from "@/stores/auth";
import { usePayers } from "@/stores/payers";
import { useShares } from "@/stores/shares";

import { useReceipt } from "../stores/receipt";
import { ReceiptDataRes } from "../types/receipt.type";

const { photos, pickFromGallary, takePhoto } = usePhotoGallery();
const authStore = useFirebaseAuth();
const receiptStore = useReceipt();
const sharesStore = useShares();
const payerStore = usePayers();

const { itemIds } = storeToRefs(receiptStore);
const { payerIds } = storeToRefs(payerStore);

const router = useRouter();

const isLoaderOpen = ref(false);
const showLoader = () => {
  isLoaderOpen.value = true;
};
const hideLoader = () => {
  isLoaderOpen.value = false;
};

async function handleImageUpload() {
  showLoader();
  const formBody = new FormData();

  for (const photo of photos.value) {
    if (!photo.webviewPath) {
      continue;
    }

    const blob = await webPathToBlob(photo.webviewPath);

    if (!blob) return;
    formBody.append("files", blob, photo.filename);
  }

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
    hideLoader();
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

      receiptStore.recalculateTotal();

      sharesStore.syncNewPayersOrItemIds(payerIds.value, itemIds.value);
      router.push("/tabs/receipt");
    }

    hideLoader();
  }
}

// Defer loading danfojs to improve initial page load performance
// Only load danfojs when user already seen this page
const danfojsScriptTag = document.head.appendChild(
  document.createElement("script")
);
danfojsScriptTag.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/danfojs@1.2.0/lib/bundle.js"
);
danfojsScriptTag.setAttribute("defer", "true");
</script>

<style>
ion-thumbnail {
  --size: 9rem;
  /* --border-radius: 20px; */
}
</style>
