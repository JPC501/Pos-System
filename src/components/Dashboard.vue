<template>
  <div class="flex">
    <!-- Sidebar fijo -->
    <div
      class="fixed inset-y-0 z-50 flex w-50 flex-col border-r border-gray-200 bg-white px-6 pb-4 overflow-y-auto"
    >
      <div
        class="flex justify-center h-10 my-3 px-1 rounded-lg shrink-0 items-center bg-gray-200"
      >
        <h1 class="font-bold text-[#364152] text-sm">
          <span class="text-xl">🌮</span> Mandu Pastel
        </h1>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'size-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <a
              href="#"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Cog6ToothIcon
                class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Contenido principal -->
    <div class="ml-50 flex-1">
      <div
        class="sticky top-0 z-40 bg-white px-8 py-2 border-b border-gray-200"
      >
        <div class="flex items-center justify-between">
          <form class="flex-1">
            <button
              type="button"
              class="rounded-sm bg-green-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Crear Venta $
            </button>
            <button
              type="button"
              class="rounded-sm bg-red-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 ml-3"
            >
              Crear Fiado $
            </button>
          </form>
          <div class="flex items-center gap-x-6">
            <button class="text-gray-400 hover:text-gray-500">
              <BellIcon class="size-6" aria-hidden="true" />
            </button>
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center">
                <img
                  class="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="ml-4 text-sm font-semibold text-gray-900"
                  >Tom Cook</span
                >
              </MenuButton>
            </Menu>
          </div>
        </div>
      </div>

      <main class="p-8">
        <EstadoGlobal />
      </main>
    </div>
  </div>
</template>

<script setup>
import EstadoGlobal from "./vistas-menu/EstadoGlobal.vue";

import { Menu, MenuButton } from "@headlessui/vue";
import {
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Estado Global", href: "#", icon: HomeIcon, current: true },
  { name: "Vender", href: "#", icon: UsersIcon, current: false },
  { name: "Inventario", href: "#", icon: FolderIcon, current: false },
  { name: "Lista Fiados", href: "#", icon: CalendarIcon, current: false },
  {
    name: "Empleados",
    href: "#",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
</script>
