<template>
  <div class="container px-4 mt-10">
    <div class="">
      <table class="min-w-full border-collapse border-gray-300">
        <thead class="side">
          <tr class="bg-gray-200 text-left">
            <th
              v-for="(header, index) in tableHeaders"
              :key="index"
              class="border-b border-gray-300 px-4 py-4 relative"
              @click="clickHeader(header)"
              @dblclick="editHeader(header)"
            >
              <span v-if="header.icon">{{ header.icon }}</span>
              {{ header.label }}
              <span
                v-if="index < tableHeaders.length - 1"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-gray-300"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableData"
            :key="index"
            class="hover:bg-gray-100"
          >
            <td
              class="border-b border-gray-300 px-4 py-5"
              @click="clickRow(row)"
              @dblclick="editName(row)"
            >
              <span v-if="!row.isEditingName" class="text-blue-600 font-medium">
                {{ row.name }}</span
              >
              <input
                v-else
                v-model="row.name"
                class="w-full px-2 py-1 border rounded"
                :placeholder="row.name"
                @blur="saveEditName(row)"
                @keyup.enter="saveEditName(row)"
              />
            </td>
            <td
              class="border-b border-gray-300 px-4 py-2"
              @click="clickRow(row)"
              @dblclick="editAge(row)"
            >
              <span v-if="!row.isEditingAge">{{ row.age }}</span>
              <input
                v-else
                v-model="row.age"
                type="number"
                class="w-full px-2 py-1 border rounded"
                :placeholder="row.age"
                @blur="saveEditAge(row)"
                @keyup.enter="saveEditAge(row)"
              />
            </td>
            <td
              class="border-b border-gray-300 px-4 py-2"
              @click="clickRow(row)"
              @dblclick="editAddress(row)"
            >
              <span v-if="!row.isEditingAddress">{{ row.address }}</span>
              <input
                v-else
                v-model="row.address"
                class="w-full px-2 py-1 border rounded"
                :placeholder="row.address"
                @blur="saveEditAddress(row)"
                @keyup.enter="saveEditAddress(row)"
              />
            </td>
            <td
              class="border-b border-gray-300 px-4 py-2"
              @click="clickRow(row)"
              @dblclick="editTags(row)"
            >
              <div v-if="!row.isEditingTags">
                <span
                  v-for="(tag, tagIndex) in row.tags"
                  :key="tagIndex"
                  :class="[
                    'inline-block px-2 py-1 rounded-md text-xs mr-1',
                    {
                      'bg-green-200 text-green-800': ['NICE', 'COOL'].includes(
                        tag
                      ),
                      'bg-red-200 text-red-800': tag === 'LOSER',
                      'bg-blue-200 text-blue-800': [
                        'TEACHER',
                        'DEVELOPER',
                      ].includes(tag),
                    },
                  ]"
                >
                  {{ tag }}
                </span>
              </div>
              <div v-else>
                <input
                  v-model="row.newTag"
                  @keyup.enter="addTag(row)"
                  placeholder="Add new tag"
                  class="w-full px-2 py-1 border rounded mb-2"
                />
                <div>
                  <span
                    v-for="(tag, tagIndex) in row.tags"
                    :key="tagIndex"
                    :class="[
                      'inline-block px-2 py-1 rounded-md text-xs mr-1 mb-1',
                      {
                        'bg-green-200 text-green-800': [
                          'NICE',
                          'COOL',
                        ].includes(tag),
                        'bg-red-200 text-red-800': tag === 'LOSER',
                        'bg-blue-200 text-blue-800': [
                          'TEACHER',
                          'DEVELOPER',
                        ].includes(tag),
                      },
                    ]"
                  >
                    {{ tag }}
                    <button
                      @click="removeTag(row, tagIndex)"
                      class="ml-1 text-gray-600 hover:text-gray-800"
                    >
                      &times;
                    </button>
                  </span>
                </div>
                <button class="text-blue-500 mt-2" @click="saveEditTags(row)">
                  Save Tags
                </button>
              </div>
            </td>
            <td
              class="border-b border-gray-300 px-4 py-2"
              @click="clickRow(row)"
            >
              <button
                v-if="!row.isEditing"
                class="text-blue-500"
                @click="invite(row.name)"
              >
                Invite — {{ row.name }}
              </button>
              <div v-if="!row.isEditing" class="relative inline-block">
                <button
                  class="text-gray-500 ml-2"
                  @click="toggleMoreActions(index)"
                >
                  More actions
                  <span
                    :class="{
                      'rotate-90 transform translate-y-1': row.showMoreActions,
                    }"
                    class="inline-block transition-transform duration-200"
                    >&gt;</span
                  >
                </button>
                <div
                  v-if="row.showMoreActions"
                  class="absolute left-[118px] w-48 bg-white rounded-lg shadow-lg z-10"
                >
                  <button
                    class="block w-full text-left px-4 py-2 text-md text-white bg-green-500 hover:bg-green-600 border border-green-500 rounded-lg"
                    @click="editRow(row)"
                  >
                    Edit
                  </button>
                  <button
                    class="block w-full text-left px-4 py-2 text-md text-white bg-red-500 hover:bg-red-600 border border-red-500 rounded-lg"
                    @click="deleteRow(index)"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div v-else class="flex justify-center">
                <button
                  class="text-green-500 mr-2 px-2 py-1 border border-green-500 rounded hover:bg-green-100"
                  @click="saveEdit(row)"
                >
                  Save
                </button>
                <button
                  class="text-red-500 px-2 py-1 border border-red-500 rounded hover:bg-red-100"
                  @click="cancelEdit(row)"
                >
                  Cancel
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeaders: [
        { label: "Name" },
        { label: "Age" },
        { label: "Address" },
        { label: "Tags" },
        { label: "Action" },
      ],
      tableData: [
        {
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["NICE", "DEVELOPER"],
          showMoreActions: false,
          isEditing: false,
          isEditingName: false,
          isEditingAge: false,
          isEditingAddress: false,
          isEditingTags: false,
          newTag: "",
        },
        {
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["LOSER"],
          showMoreActions: false,
          isEditing: false,
          isEditingName: false,
          isEditingAge: false,
          isEditingAddress: false,
          isEditingTags: false,
          newTag: "",
        },
        {
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["COOL", "TEACHER"],
          showMoreActions: false,
          isEditing: false,
          isEditingName: false,
          isEditingAge: false,
          isEditingAddress: false,
          isEditingTags: false,
          newTag: "",
        },
      ],
      clickTimer: null,
      clickDelay: 300, // milliseconds
    };
  },
  methods: {
    deleteRow(index) {
      this.tableData.splice(index, 1);
    },
    toggleMoreActions(index) {
      this.tableData.forEach((row, i) => {
        if (i !== index) {
          row.showMoreActions = false;
        }
      });
      this.tableData[index].showMoreActions =
        !this.tableData[index].showMoreActions;
    },
    clickHeader(header) {
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
      } else {
        this.clickTimer = setTimeout(() => {
          console.log(`Clicked header: ${header.label}`);
          this.clickTimer = null;
        }, this.clickDelay);
      }
    },
    clickRow(row) {
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
      } else {
        this.clickTimer = setTimeout(() => {
          console.log(`Clicked row: ${row.name}`);
          this.clickTimer = null;
        }, this.clickDelay);
      }
    },
    editHeader(header) {
      console.log(`Editing header: ${header.label}`);
    },
    editRow(row) {
      row.isEditing = true;
      row.showMoreActions = false;
    },
    saveEdit(row) {
      row.isEditing = false;
      row.newTag = "";
    },
    cancelEdit(row) {
      row.isEditing = false;
      row.newTag = "";
    },
    addTag(row) {
      if (row.newTag.trim() !== "") {
        const words = row.newTag.trim().split(/\s+/);
        if (words.length === 1) {
          const newTag = words[0].toUpperCase();
          if (
            ["NICE", "COOL", "LOSER", "TEACHER", "DEVELOPER"].includes(newTag)
          ) {
            if (!row.tags.includes(newTag)) {
              if (
                newTag === "LOSER" &&
                (row.tags.includes("NICE") || row.tags.includes("COOL"))
              ) {
                // Do nothing if trying to add LOSER to NICE or COOL
              } else if (
                (newTag === "NICE" || newTag === "COOL") &&
                row.tags.includes("LOSER")
              ) {
                // Do nothing if trying to add NICE or COOL to LOSER
              } else {
                row.tags.push(newTag);
                row.newTag = "";
              }
            }
          }
        } else {
          this.$toast.error("Please enter only one word at a time for tags.");
        }
      }
    },
    removeTag(row, index) {
      row.tags.splice(index, 1);
    },
    editName(row) {
      row.isEditingName = true;
    },
    saveEditName(row) {
      row.isEditingName = false;
    },
    editAge(row) {
      row.isEditingAge = true;
    },
    saveEditAge(row) {
      row.isEditingAge = false;
    },
    editAddress(row) {
      row.isEditingAddress = true;
    },
    saveEditAddress(row) {
      row.isEditingAddress = false;
    },
    editTags(row) {
      row.isEditingTags = true;
    },
    saveEditTags(row) {
      row.isEditingTags = false;
    },
  },
};
</script>

<style scoped>
table {
  @apply table-auto w-full;
}

thead {
  @apply bg-gray-200;
}

tbody tr {
  @apply hover:bg-gray-100;
}
</style>
