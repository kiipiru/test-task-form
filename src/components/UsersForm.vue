<script setup lang="ts">
import { useAccountsStore } from "../stores/AccountStore";
import UserEntry from "./UserEntry.vue";
import questionIcon from "@assets/question.png";

interface Props {
  formTitle: string;
  hintText: string;
}

const props = defineProps<Props>();
const accountStore = useAccountsStore();
accountStore.loadFromStorage();

const labels = ["Метки", "Тип записи", "Логин", "Пароль"];
</script>

<template>
  <div class="form-header">
    <h2>{{ formTitle }}</h2>
    <button class="add-user-button" @click="accountStore.addAccount">+</button>
  </div>
  <div class="hint">
    <img class="question-icon" :src="questionIcon" alt="Иконка подсказки" />
    <span>{{ hintText }}</span>
  </div>
  <div class="form-grid">
    <span class="label" v-for="label in labels" :key="label">{{ label }}</span>
    <UserEntry
      v-for="account in accountStore.accounts"
      :key="account.id"
      :account="account"
      @account-deleted="(v) => accountStore.deleteAccount(v)"
    />
  </div>
</template>

<style>
.form-header {
  display: flex;
  gap: 8px;
  place-items: center;
}

.question-icon {
  filter: invert();
  padding: 4px 8px;
  height: 45px;
}

.add-user-button {
  font-size: 16px;
  padding: 5px 8px;
  max-height: 40px;
  border-radius: 0;
  background-color: white;
  color: black;
}

.hint {
  background-color: darkcyan;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  column-gap: 20px;
  align-items: center;
  row-gap: 8px;
}

.form-grid .label {
  text-align: left;
  align-self: end;
  padding-bottom: 4px;
}
</style>
