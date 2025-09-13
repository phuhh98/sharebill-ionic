<template>
  <ion-modal :is-open="isItemEditModalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="handleEditModalCancel">Cancel</ion-button>
        </ion-buttons>
        <ion-title>{{
          props.mode === EditModeEnum.edit ? "Edit item" : "Create Item"
        }}</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="handleEditModalConfirm"
            >Confirm</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-input type="text" label="Name" v-model="item.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            type="number"
            label="Quantity"
            v-model="item.quantity"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="number" label="Unit price" v-model="item.price"
            ><span slot="end">{{ currency }}</span></ion-input
          >
        </ion-item>
        <ion-item>
          <ion-input
            type="number"
            label="Total price"
            :value="itemTotalPrice"
            disabled
            ><span slot="end">{{ currency }}</span></ion-input
          >
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { computed, defineProps, toRef } from "vue";

import { useReceipt } from "@/stores/receipt";

import { ReceiptItem } from "../types/receipt.type";

const isItemEditModalOpen = defineModel<boolean>("open", {
  type: Boolean,
});

enum EditModeEnum {
  create = "create",
  edit = "edit",
}

const props = defineProps<{
  currency: string;
  item: ReceiptItem;
  mode: keyof typeof EditModeEnum;
}>();

const item = toRef(props.item);
const currency = toRef(props.currency);

const itemTotalPrice = computed(() => item.value.quantity * item.value.price);

const receiptStore = useReceipt();

const handleEditModalCancel = () => {
  isItemEditModalOpen.value = false;
};

const handleEditModalConfirm = () => {
  switch (props.mode) {
    case "create":
      addNewItem();
      break;
    case "edit":
      updateExistingItem();
      break;
    default:
      console.log("nothing to perform");
  }

  isItemEditModalOpen.value = false;
};

const updateExistingItem = () => {
  receiptStore.updateAnItem({
    ...item.value,
    price_total: itemTotalPrice.value,
  });
};

const addNewItem = () => {
  receiptStore.addNewItem({ ...item.value, price_total: itemTotalPrice.value });
};
</script>
