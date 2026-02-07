<script setup lang="ts">
import { computed } from "vue";

interface Props {
  options: string[];
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["option-chosen"]);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("option-chosen", val);
  },
});
</script>

<template>
  <select class="custom-select" v-model="selected">
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>

<style scoped>
.custom-select {
  padding: 12px 16px;
  font-size: 16px;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-width: 200px;
}

.custom-select:focus {
  outline: none;
}
</style>
