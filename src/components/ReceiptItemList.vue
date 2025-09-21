<template>
  <ion-list>
    <ion-item-group>
      <ion-item-divider>
        <ion-label>Total</ion-label>
      </ion-item-divider>
      <ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size="3">Receipt date</ion-col>
            <ion-col
              >{{
                !!receiptData.receipt_date
                  ? dayjs(receiptData.receipt_date).format("dddd MMM D YYYY")
                  : "Unknown"
              }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item lines="none">
        <ion-grid>
          <ion-row>
            <ion-col size="3">Total</ion-col>
            <ion-col>
              {{
                formatCurrency(
                  receiptData.currency,
                  receiptData.total_receipt_price
                )
              }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider>
        <ion-label>Items</ion-label>
      </ion-item-divider>

      <ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size="3">
              <span>Name</span>
            </ion-col>
            <ion-col size="3">
              <span>Quantity</span>
            </ion-col>
            <ion-col size="3">
              <span>Unit price</span>
            </ion-col>
            <ion-col size="3">
              <span>Total price</span>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item
        v-for="(item, index) in receiptData.items"
        :key="item.id"
        class="ion-activatable ripple-parent"
        :lines="index === receiptData.items.length - 1 ? 'none' : 'full'"
        @click="handleItemClick(item.id)"
      >
        <ion-grid>
          <ion-row>
            <ion-col size="3">
              <span>{{ item.name }}</span>
            </ion-col>
            <ion-col size="3">
              <span>{{ item.quantity }}</span>
            </ion-col>
            <ion-col size="3">
              <span
                >{{ formatCurrency(receiptData.currency, item.price) }}
              </span>
            </ion-col>
            <ion-col size="3">
              <span>{{
                formatCurrency(receiptData.currency, item.price_total)
              }}</span>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-ripple-effect> </ion-ripple-effect>
      </ion-item>
    </ion-item-group>
    <ion-button expand="block" @click="handleCreateModalOpen">
      <ion-icon :icon="addCircle" size="large"></ion-icon>
      <span class="tw:ml-1">New Item</span>
    </ion-button>
  </ion-list>

  <item-edit-modal
    v-model:open="isItemEditModalOpen"
    :item="modalEditingItem"
    :currency="receiptCurrencySymbol"
    :mode="modalMode"
  ></item-edit-modal>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonRippleEffect,
  IonRow,
} from "@ionic/vue";
import getSymbolFromCurrency from "currency-symbol-map";
import dayjs from "dayjs";
import { addCircle } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { v4 as uuidV4 } from "uuid";
import { computed, reactive, ref } from "vue";

import { useActions } from "@/composables/useActions";
import { useReceipt } from "@/stores/receipt";

import { formatCurrency } from "../lib/currency";
import { ReceiptItem } from "../types/receipt.type";
import ItemEditModal from "./ItemEditModal.vue";

const receiptCurrencySymbol = computed(
  () => getSymbolFromCurrency(receiptData.value.currency) ?? ""
);

const receiptStore = useReceipt();
const { receiptData } = storeToRefs(receiptStore);

const { receiptItemActions, ReceiptItemActionsEnum } = useActions();

const handleItemClick = async (itemId: string) => {
  const selectedOption = await receiptItemActions();

  switch (selectedOption) {
    case ReceiptItemActionsEnum.Edit:
      handleEditModalOpen(itemId);
      break;
    case ReceiptItemActionsEnum.Remove:
      receiptStore.removeAnItem(itemId);
      break;
    default:
      console.log("select cancel");
  }
};

const modalMode = ref<"create" | "edit">("edit");
const modalEditingItem = reactive<ReceiptItem>({
  id: "",
  name: "",
  price: 0,
  price_total: 0,
  quantity: 0,
});

const isItemEditModalOpen = ref(false);

const handleEditModalOpen = (itemId: string) => {
  const item = receiptData.value.items.find((item) => item.id === itemId);
  modalMode.value = "edit";

  if (item) {
    modalEditingItem.id = item.id;
    modalEditingItem.name = item.name;
    modalEditingItem.price = item.price;
    modalEditingItem.quantity = item.quantity;
    modalEditingItem.price_total = item.price_total;

    isItemEditModalOpen.value = true;
  }
};

const handleCreateModalOpen = () => {
  const itemId = uuidV4();

  modalMode.value = "create";
  modalEditingItem.id = itemId;
  modalEditingItem.name = "New item";
  modalEditingItem.price = 0;
  modalEditingItem.quantity = 0;
  modalEditingItem.price_total = 0;

  isItemEditModalOpen.value = true;
};
</script>
