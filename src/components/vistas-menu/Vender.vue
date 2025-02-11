<template>
  <div class="mx-auto w-full max-w-7xl grow flex xl:px-2 h-full">
    <!-- Sección de Productos (Izquierda) -->
    <div class="flex-1 xl:flex">
      <div class="p-4 xl:w-2/3 xl:border-r">
        <div class="grid grid-cols-3 gap-4">
          <!-- Botón de Crear Producto -->
          <div
            class="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-100"
          >
            <span class="text-3xl">➕</span>
            <p class="mt-2 font-semibold text-gray-700 text-sm">
              Crear producto
            </p>
          </div>

          <!-- Productos dinámicos -->
          <div
            v-for="product in products"
            :key="product.id"
            class="rounded-lg p-3 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center relative"
            @click="addToCart(product)"
          >
            <!-- Contador de unidades si el producto está en el carrito -->
            <div
              v-if="getProductQuantity(product.id) > 0"
              class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {{ getProductQuantity(product.id) }}
            </div>

            <img
              :src="product.image"
              alt="Imagen del producto"
              class="h-16 w-auto mx-auto mb-2"
            />
            <p class="text-md font-semibold">${{ product.price }}</p>
            <p class="text-xs text-gray-600 text-center">{{ product.name }}</p>
            <p class="text-xs text-gray-500">{{ product.stock }} disponibles</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de la Canasta (Derecha) -->
    <div
      class="shrink-0 border-l border-gray-200 p-4 lg:w-96 flex flex-col h-full"
    >
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-bold">Productos Seleccionados</h2>
        <button
          @click="clearCart"
          class="text-red-500 text-sm font-semibold hover:underline"
        >
          Vaciar canasta
        </button>
      </div>

      <!-- Contenedor de productos con scroll interno y sin bordes -->
      <div class="flex-1 overflow-y-auto px-2" style="max-height: 300px">
        <div
          v-if="selectedProducts.length === 0"
          class="text-center text-gray-500 flex flex-col items-center"
        >
          <span class="text-3xl">📡</span>
          <p class="mt-2 text-sm">No hay productos en la canasta</p>
        </div>

        <div
          v-for="item in selectedProducts"
          :key="item.id"
          class="py-3 flex items-center border-b border-gray-300"
        >
          <!-- Imagen -->
          <img
            :src="item.image"
            alt="Imagen"
            class="h-14 w-14 rounded-md mr-4"
          />

          <!-- Información del producto -->
          <div class="flex-1">
            <p class="font-semibold text-md">{{ item.name }}</p>
            <p class="text-xs text-gray-500">{{ item.stock }} disponibles</p>
          </div>

          <!-- Precio y botones -->
          <div class="text-right">
            <p class="text-lg font-semibold">
              ${{ item.price * item.quantity }}
            </p>
            <div class="flex items-center justify-end mt-1 space-x-2">
              <button
                @click="decreaseQuantity(item.id)"
                class="text-lg font-bold px-2 py-1 bg-gray-200 rounded"
              >
                ➖
              </button>
              <span class="text-md font-semibold">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item.id)"
                class="text-lg font-bold px-2 py-1 bg-gray-200 rounded"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Total y botón de continuar (SIEMPRE VISIBLE) -->
      <div class="border-t border-gray-300 pt-4">
        <div class="flex justify-between items-center">
          <span class="text-md font-semibold">Total: ${{ total }}</span>
          <button
            class="px-3 py-2 bg-gray-300 rounded-lg text-gray-700 text-sm font-semibold hover:bg-gray-400"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const products = ref([
  {
    id: 1,
    name: "Coca Cola 3L",
    price: 7500,
    stock: 110,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Galleta",
    price: 100,
    stock: 100,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Harina Pan 500gr",
    price: 2300,
    stock: 11,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Hit Frutas 500ml",
    price: 2500,
    stock: 110,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Cigarrillos Rothmans",
    price: 4300,
    stock: 110,
    image: "https://via.placeholder.com/50",
  },
]);

const selectedProducts = ref([]);

const addToCart = (product) => {
  const existingProduct = selectedProducts.value.find(
    (item) => item.id === product.id
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    selectedProducts.value.push({ ...product, quantity: 1 });
  }
};

const increaseQuantity = (id) => {
  const product = selectedProducts.value.find((item) => item.id === id);
  if (product) product.quantity += 1;
};

const decreaseQuantity = (id) => {
  const product = selectedProducts.value.find((item) => item.id === id);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
  } else {
    removeProductCompletely(id);
  }
};

const removeProductCompletely = (id) => {
  selectedProducts.value = selectedProducts.value.filter(
    (item) => item.id !== id
  );
};

const getProductQuantity = (id) => {
  const product = selectedProducts.value.find((item) => item.id === id);
  return product ? product.quantity : 0;
};

// 🔹 Limpiar la lista completa
const clearCart = () => {
  selectedProducts.value = [];
};

const total = computed(() =>
  selectedProducts.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
);
</script>
