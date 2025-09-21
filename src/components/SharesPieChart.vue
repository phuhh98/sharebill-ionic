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
import * as math from "mathjs";
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

interface ShareData {
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
      name: payerIdNameMap.value[payerId] || "Unknown",
      value: math.round((shareAmount / totalReceiptPrice.value) * 100 || 0, 2),
    }))
  );
  // now calculate unshared amount
  const totalSharedAmount = Object.values(moneySharePerPayerId).reduce(
    (acc, val) => acc + val,
    0
  );

  reducedShareData.push({
    name: "Unshared",
    value:
      totalReceiptPrice.value === 0
        ? 100
        : math.round(
            ((totalReceiptPrice.value - totalSharedAmount) /
              totalReceiptPrice.value) *
              100,
            2
          ) || 0,
  });

  return reducedShareData;
});

const chartData = computed<ChartData<"pie">>(() => {
  return {
    datasets: [
      {
        // backgroundColor: cycledArray(COLLOR_PALETTE, shareData.value.length),
        data: shareData.value.map((data) => data.value),
        label: "Shares",
      },
    ],
    labels: shareData.value.map((data) => data.name),
  };
});

const chartOptions: ChartOptions<"pie"> = {
  maintainAspectRatio: false,
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
          const value = context.parsed || 0;
          const amount = (value / 100) * (totalReceiptPrice.value || 0);
          return ` Amount: ${formatCurrency(
            receiptData.value.currency,
            math.round(amount, 2)
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
