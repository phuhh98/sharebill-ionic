<template>
  <div class="tw:h-full">
    <swiper
      :modules="swiperModules"
      :pagination="{
        dynamicBullets: true,
      }"
      class="tw:h-full"
    >
      <swiper-slide v-for="item in receiptData.items" :key="item.id">
        <ion-content>
          <ion-list>
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Item details</ion-label>
              </ion-item-divider>
              <ion-item>
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">Name</ion-col>
                    <ion-col>{{ item.name }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
              <ion-item>
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">Quantity</ion-col>
                    <ion-col>{{ item.quantity }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
              <ion-item>
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">Unit price</ion-col>
                    <ion-col>
                      {{ formatCurrency(receiptData.currency, item.price) }}
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
              <ion-item lines="none">
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">Total price</ion-col>
                    <ion-col>{{
                      formatCurrency(receiptData.currency, item.price_total)
                    }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-item-group>
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Shares</ion-label>
              </ion-item-divider>
              <ion-item v-for="payer in payerList" :key="payer.id">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <div
                        class="tw:flex tw:flex-row tw:justify-between tw:items-center tw:h-full"
                      >
                        <span>{{ payer.name }}</span>
                        <span>{{ findPayerShare(payer.id, item.id) }}</span>
                      </div>
                    </ion-col>
                    <ion-col size="5">
                      <ion-button
                        size="default"
                        @click="sharesStore.shareDecrease(payer.id, item.id, 1)"
                      >
                        <ion-icon :icon="removeCircle"></ion-icon>
                      </ion-button>
                      <ion-button
                        size="default"
                        @click="sharesStore.shareIncrease(payer.id, item.id, 1)"
                      >
                        <ion-icon :icon="addCircle"></ion-icon>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
            </ion-item-group>
          </ion-list>
        </ion-content>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/vue";
import { addCircle, removeCircle } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { Pagination } from "swiper/modules";
// import style for swiper
import { Swiper, SwiperSlide } from "swiper/vue";

import { formatCurrency } from "@/lib/currency";
import { usePayers } from "@/stores/payers";
import { useReceipt } from "@/stores/receipt";

import "swiper/css";
import "swiper/css/pagination";

import { useShares } from "../stores/shares";

const swiperModules = [Pagination];

const receiptStore = useReceipt();
const payerStore = usePayers();
const sharesStore = useShares();

const { receiptData } = storeToRefs(receiptStore);
const { payerList } = storeToRefs(payerStore);
const { shares } = storeToRefs(sharesStore);

const findPayerShare = (payerId: string, itemId: string) => {
  return shares.value[itemId][payerId];
};
</script>
