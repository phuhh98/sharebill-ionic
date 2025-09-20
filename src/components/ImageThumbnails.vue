<template>
  <ion-grid>
    <ion-row size>
      <ion-col
        size="6"
        :key="photo.id"
        v-for="photo in photos"
        :id="hostId(photo.id)"
        @click="handlePhotoActions(photo.id)"
      >
        <div
          class="tw:relative tw:flex tw:justify-center"
          @click="thumbnailFocus(photo.id)"
        >
          <ion-thumbnail>
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-thumbnail>
          <div
            :id="overlayId(photo.id)"
            :class="`tw:invisible tw:absolute tw:top-0 tw:bg-gray-500 tw:opacity-60 tw:w-full tw:h-full`"
          ></div>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script setup lang="ts">
import { IonCol, IonGrid, IonImg, IonRow, IonThumbnail } from "@ionic/vue";

import { useActions } from "@/composables/useActions";
import { usePhotoGallery } from "@/composables/usePhotoGallery";

const { photos, removePhoto } = usePhotoGallery();
const { confirmDeleteActions, ConfirmDeleteActionsEnum } = useActions();

const hostId = (photoId: string) => {
  return `host-${photoId}`;
};

const overlayId = (photoId: string) => {
  return `overlay-${photoId}`;
};

const thumbnailFocus = (photoId: string) => {
  const hostEl = window.document.querySelector(`#${hostId(photoId)}`)!;
  const overlay = hostEl.querySelector(`#${overlayId(photoId)}`)!;

  overlay.classList.remove("tw:invisible");
};

const thumbnailBlur = (photoId: string) => {
  const hostEl = window.document.querySelector(`#${hostId(photoId)}`)!;
  const overlay = hostEl.querySelector(`#${overlayId(photoId)}`)!;

  overlay.classList.add("tw:invisible");
};

const handlePhotoActions = async (photoId: string) => {
  const selectedOption = await confirmDeleteActions();

  switch (selectedOption) {
    case ConfirmDeleteActionsEnum.Confirmed:
      await removePhoto(photos.value.find((p) => p.id === photoId)!);
      break;
    default:
      console.log("select cancel");
  }

  thumbnailBlur(photoId);
};
</script>
<style lang=""></style>
