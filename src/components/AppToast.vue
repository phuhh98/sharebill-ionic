<template>
  <ion-toast
    :is-open="isOpen"
    :message="message"
    :duration="
      !!toastDuration ? TOAST_DURATIONS[toastDuration] : TOAST_DURATIONS.short
    "
    @didDismiss="toastDismiss"
    :color="safe ? 'primary' : 'danger'"
    swipe-gesture="vertical"
    position-anchor="header"
    position="top"
  ></ion-toast>
</template>
<script setup lang="ts">
import { IonToast } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { toRef } from "vue";

import { useToastStore } from "@/stores/toast";

enum TOAST_DURATIONS {
  long = 3500,
  short = 2000,
}
interface Props {
  toastDuration?: TOAST_KEY;
}

type TOAST_KEY = keyof typeof TOAST_DURATIONS;

const props = withDefaults(defineProps<Props>(), {
  toastDuration: "short",
});

const toastDuration = toRef(props, "toastDuration");

const toastStore = useToastStore();

const { isOpen, message, safe } = storeToRefs(toastStore);

const toastDismiss = () => {
  toastStore.dismissToast();
};
</script>
<style lang=""></style>
