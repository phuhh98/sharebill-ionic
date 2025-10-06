<template>
  <div class="tw:h-full">
    <swiper
      :modules="swiperModules"
      :pagination="{
        dynamicBullets: true,
      }"
      class="tw:h-full"
      @slide-change="swiperSlideChangeHandler"
      ref="swiperRef"
    >
      <swiper-slide v-for="item in receiptData.items" :key="item.id">
        <ion-content>
          <share-progress></share-progress>

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
import { Swiper as SwiperType } from "swiper/types";
// import style for swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ShareProgress from "@/components/ShareProgress.vue";

import "swiper/css";
import "swiper/css/pagination";

import { formatCurrency } from "@/lib/currency";
import { usePayers } from "@/stores/payers";
import { useReceipt } from "@/stores/receipt";
import { useShares } from "@/stores/shares";

const router = useRouter();
const route = useRoute();

// const swiper = useSwiper();
const swiperRef = ref<null | { $el: { swiper: SwiperType } }>(null);

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

/**
 * Handle swiper slide change event
 * Update the route query params with the current item's id
 * @param swiper - Swiper instance
 */
const swiperSlideChangeHandler = (swiper: SwiperType) => {
  const itemId = receiptData.value.items[swiper.activeIndex].id;

  if (route.query.itemId === itemId) return;
  // update the url query params
  router.replace(`/tabs/share?itemId=${itemId}`);
};

onMounted(() => {
  /**
   * When component is mounted, check if the route has itemId query param
   * if not, set it to the first item's id
   * if yes, set the swiper to the item with that id
   */
  if (swiperRef.value != null) {
    const itemId =
      receiptData.value.items[swiperRef.value.$el.swiper.activeIndex]?.id;

    if (itemId != null && route.query.itemId == undefined) {
      router.replace(`/tabs/share?itemId=${itemId}`);
      return;
    }

    /**
     * Case where navigate from item in receipt page to share page
     * In this case, the route query param will have the itemId
     */
    if (route.query.itemId) {
      const itemIndex = receiptData.value.items.findIndex(
        (item) => item.id === route.query.itemId
      );

      if (itemIndex !== -1) {
        setTimeout(() => {
          swiperRef.value?.$el.swiper.slideTo(itemIndex);
          swiperRef.value?.$el.swiper.update();
        }, 0);
      }
      return;
    }
  }
});

/**
 * Watch for route query changes, if itemId changes, update the swiper to the item with that id
 */
watch(
  () => route.query.itemId,
  (newItemId, _) => {
    if (newItemId) {
      const itemIndex = receiptData.value.items.findIndex(
        (item) => item.id === newItemId
      );

      if (swiperRef.value != null && itemIndex !== -1) {
        swiperRef.value.$el.swiper.slideTo(itemIndex);

        swiperRef.value.$el.swiper.update();
      }
    }
  },
  { immediate: true }
);
</script>
