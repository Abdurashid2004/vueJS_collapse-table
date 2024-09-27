<template>
  <div class="container mx-auto mt-10 w-1/3">
    <ul class="list-none">
      <li v-for="node in treeData" :key="node.id">
        <div
          @click="toggle(node)"
          class="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg mb-1 flex items-center"
        >
          <span class="mr-2">
            <i
              :class="[
                'fas fa-chevron-right',
                'transform transition-transform duration-300',
                { 'rotate-90': node.isOpen },
              ]"
            ></i>
          </span>
          {{ node.name }}
        </div>
        <ul
          v-if="node.isOpen && node.children && node.children.length > 0"
          class="ml-6"
        >
          <li v-for="child in node.children" :key="child.id">
            <div
              @click="toggle(child)"
              class="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg mb-1 flex items-center"
            >
              <span class="mr-2">
                <i
                  :class="[
                    'fas fa-chevron-right',
                    'transform transition-transform duration-300',
                    { 'rotate-90': child.isOpen },
                  ]"
                ></i>
              </span>
              {{ child.name }}
            </div>
            <ul
              v-if="child.isOpen && child.children && child.children.length > 0"
              class="ml-6"
            >
              <li v-for="grandchild in child.children" :key="grandchild.id">
                <div
                  @click="toggle(grandchild)"
                  class="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg mb-1 flex items-center"
                >
                  <span class="mr-2">
                    <i
                      :class="[
                        // 'fas fa-chevron-right',
                        'transform transition-transform duration-300',
                        { 'rotate-90': grandchild.isOpen },
                      ]"
                    ></i>
                  </span>
                  {{ grandchild.name }}
                </div>
                <ul
                  v-if="
                    grandchild.isOpen &&
                    grandchild.children &&
                    grandchild.children.length > 0
                  "
                  class="ml-6"
                >
                  <li
                    v-for="ggrandchild in grandchild.children"
                    :key="ggrandchild.id"
                  >
                    <div
                      class="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg mb-1 flex items-center"
                    >
                      <span class="mr-2">
                        <i class="fas fa-chevron-right"></i>
                      </span>
                      {{ ggrandchild.name }}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Tree structure data
const treeData = ref([
  {
    id: 1,
    name: "Models",
    isOpen: false,
    children: [
      {
        id: 2,
        name: "Data warehouse",
        isOpen: false,
        children: [
          { id: 3, name: "Report samples", isOpen: false },
          { id: 4, name: "Sales performance", isOpen: false },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Statistics",
    isOpen: false,
    children: [
      {
        id: 7,
        name: "Data warehouse",
        isOpen: false,
        children: [
          { id: 8, name: "Report samples", isOpen: false },
          { id: 9, name: "Sales performance", isOpen: false },
        ],
      },
    ],
  },
]);

// Toggle open/close function
function toggle(node) {
  node.isOpen = !node.isOpen;
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
