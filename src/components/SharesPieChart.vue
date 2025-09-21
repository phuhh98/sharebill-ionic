<template>
  <div class="tw:w-full tw:mb-8">
    <canvas :id="CHART_ID"></canvas>
  </div>
</template>
<script setup lang="ts">
import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  Colors,
  Legend,
  PieController,
  Title,
  Tooltip,
} from "chart.js";
import { round } from "mathjs";
import { storeToRefs } from "pinia";
import {
  computed,
  onMounted,
  onUpdated,
  onWatcherCleanup,
  ref,
  watch,
} from "vue";

import { useCalculateShares } from "@/composables/useCalculateShare";
import { usePayers } from "@/stores/payers";
import { useReceipt } from "@/stores/receipt";

import { formatCurrency } from "../lib/currency";

const ctx = ref<HTMLCanvasElement | null>(null);

Chart.register(ArcElement, Title, Tooltip, Legend, PieController, Colors);

const receiptStore = useReceipt();
const { receiptData, totalReceiptPrice } = storeToRefs(receiptStore);

const payersStore = usePayers();
const { payerIdNameMap } = storeToRefs(payersStore);

const { calculation } = useCalculateShares();

const CHART_ID = "shareChart";
const NOT_SHARED_KEY = "Not shared";

interface ChartDataPoint {
  id: string;
  value: number;
}

interface ShareData {
  id: string;
  name: string;
  value: number;
}

// Calculate share data for the pie chart in percentage
const shareData = computed<ShareData[]>(() => {
  const reducedShareData: ShareData[] = [];
  const moneySharePerPayerId = calculation.moneySharePerPayerId;
  if (!moneySharePerPayerId) return reducedShareData;

  reducedShareData.push(
    ...Object.entries(moneySharePerPayerId).map(([payerId, shareAmount]) => ({
      id: payerId,
      name: payerIdNameMap.value[payerId] || "Unknown",
      value: round((shareAmount / totalReceiptPrice.value) * 100 || 0, 2),
    }))
  );
  // now calculate unshared amount
  const totalSharedAmount = Object.values(moneySharePerPayerId).reduce(
    (acc, val) => acc + val,
    0
  );

  reducedShareData.push({
    id: NOT_SHARED_KEY,
    name: NOT_SHARED_KEY,
    value:
      totalReceiptPrice.value === 0
        ? 100
        : round(
            ((totalReceiptPrice.value - totalSharedAmount) /
              totalReceiptPrice.value) *
              100,
            2
          ) || 0,
  });

  return reducedShareData;
});

const chartData = computed<ChartData<"pie", ChartDataPoint[]>>(() => {
  return {
    datasets: [
      {
        // backgroundColor: cycledArray(COLLOR_PALETTE, shareData.value.length),
        data: shareData.value.map((data) => ({
          id: data.id,
          value: data.value,
        })),
        label: "Shares",
      },
    ],
    labels: shareData.value.map((data) => data.name),
  };
});

const chartOptions: ChartOptions<"pie"> = {
  maintainAspectRatio: false,
  parsing: {
    key: "value",
  },
  plugins: {
    legend: {
      position: "left",
    },
    title: {
      display: true,
      font: {
        size: 20,
      },
      text: "Shares Distribution",
    },
    tooltip: {
      callbacks: {
        afterLabel: function (context) {
          if ((context.raw as ChartDataPoint).id === NOT_SHARED_KEY) {
            const value = context.parsed || 0;
            const amount = (value / 100) * (totalReceiptPrice.value || 0);

            return ` Amount: ${formatCurrency(
              receiptData.value.currency,
              round(amount, 3) || 0
            )}`;
          }

          return ` Amount: ${formatCurrency(
            receiptData.value.currency,
            calculation.moneySharePerPayerId[
              (context.raw as ChartDataPoint).id
            ] || 0
          )}`;
        },
        label: function (context) {
          const label = context.label || "";
          const value = context.parsed || 0;
          return ` ${label}: ${value}%`;
        },
      },
    },
  },
  responsive: true,
};

onMounted(() => {
  ctx.value = document.getElementById(CHART_ID) as HTMLCanvasElement;
});

onUpdated(() => {
  ctx.value = document.getElementById(CHART_ID) as HTMLCanvasElement;
});

watch([chartData, ctx], () => {
  if (!ctx.value) return;

  const chart = new Chart(ctx.value, {
    data: chartData.value,
    options: chartOptions,
    type: "pie",
  });

  onWatcherCleanup(() => {
    chart.destroy();
  });
});
</script>
<style></style>
