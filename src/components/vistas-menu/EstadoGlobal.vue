<template>
  <div>
    <h3 class="text-base font-semibold text-gray-900">Last 30 days</h3>
    <dl
      class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div
            class="flex items-baseline text-2xl font-semibold text-indigo-600"
          >
            {{ item.stat }}
          </div>

          <div>
            <span class="sr-only">
              {{ item.changeType === "increase" ? "Increased" : "Decreased" }}
              by
            </span>
            {{ item.change }}
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";

const stats = [
  {
    name: "Ventas Del dia",
    stat: "$100.000",
  },
  {
    name: "Ganancia del mes",
    stat: "58.16%",
  },
  {
    name: "Avg. Click Rate",
    stat: "24.57%",
  },
];
</script>
