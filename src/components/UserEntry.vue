<script setup lang="ts">
import { computed, ref } from "vue";
import CustomSelect from "./CustomSelect.vue";
import { UserAccount } from "../types/types";
import { useAccountsStore } from "../stores/AccountStore";
import trash-icon from "@assets/trash.png";
console.log(trash-icon);

interface Props {
  account: UserAccount;
}

const props = defineProps<Props>();
const emit = defineEmits(["account-deleted"]);
const accountsStore = useAccountsStore();

const options = ["Локальная", "LDAP"];

const hasLoginErrors = ref<boolean>(false);
const hasPasswordErrors = ref<boolean>(false);
const tags = ref<UserAccount["tags"]>(props.account.tags);
const login = ref<UserAccount["login"]>(props.account.login);
const passwordInput = ref<UserAccount["password"]>(props.account.password);
const accountType = ref<UserAccount["type"]>(props.account.type);
const showPassword = ref<boolean>(false);

const isValid = computed(
  () => !hasLoginErrors.value && !hasPasswordErrors.value,
);
const tagsInput = computed({
  get: () => tags.value.map((tag) => tag.text).join("; "),
  set: (val: string) => {
    tags.value = val
      .split(";")
      .map((text) => text.trim())
      .filter((text) => text)
      .map((text) => ({ text }));
  },
});
const password = computed(() => (isLocal.value ? passwordInput.value : null));
const isLocal = computed(() => accountType.value === "Локальная");
const account = computed((): UserAccount => {
  return {
    tags: tags.value,
    login: login.value,
    type: accountType.value,
    password: password.value,
    id: props.account.id,
  };
});

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
function validateAccount() {
  hasLoginErrors.value = !login.value?.trim();
  hasPasswordErrors.value = isLocal.value && !password.value?.trim();
}
function updateValidatedAccount() {
  validateAccount();
  if (isValid.value) {
    accountsStore.updateAccount(account.value.id, account.value);
  }
}
function handleSelect(v: UserAccount["type"]) {
  accountType.value = v;
  updateValidatedAccount();
}
function handleBlur() {
  updateValidatedAccount();
}
</script>

<template>
  <form class="user-row">
    <input
      v-model="tagsInput"
      maxlength="50"
      @blur="handleBlur()"
      placeholder="Значение"
    />
    <CustomSelect
      :model-value="accountType"
      :options="options"
      @option-chosen="(v) => handleSelect(v)"
    />
    <template v-if="isLocal">
      <input
        :class="{ has-error: hasLoginErrors }"
        v-model="login"
        placeholder="Значение"
        maxlength="100"
        @blur="handleBlur"
      />
      <div class="last-column-container">
        <div class="password-input-container">
          <input
            class="password-input"
            :class="{ has-error: hasPasswordErrors }"
            maxlength="100"
            v-model="passwordInput"
            :type="showPassword ? 'text' : 'password'"
            @blur="handleBlur()"
            placeholder="Введите пароль"
          />
          <button
            class="password-visibility-button"
            type="button"
            @click="togglePasswordVisibility"
          />
        </div>
        <button
          class="delete-button"
          type="button"
          @click="emit('account-deleted', account.id)"
        >
          <img
            class="trash-icon"
            :src="trash-icon"
            alt="Иконка удаления записи"
          />
        </button>
      </div>
    </template>
    <template v-else>
      <div class="login-stretched-wrapper">
        <input
          :class="{ has-error: hasLoginErrors }"
          v-model="login"
          placeholder="Значение"
          maxlength="100"
          @blur="handleBlur"
        />
        <button
          class="delete-button"
          type="button"
          @click="emit('account-deleted', account.id)"
        >
          <img
            class="trash-icon"
            :src="trash-icon"
            alt="Иконка удаления записи"
          />
        </button>
      </div>
    </template>
  </form>
</template>

<style>
.user-row {
  display: contents;
}

.password-input-container {
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
}

.password-input-container .password-input {
  flex: 1;
  min-width: 0;
  width: 0;
}

.password-visibility-button {
  position: absolute;
  right: 10px;
  top: 50%;
  padding: 0;
  height: 16px;
  width: 16px;
  transform: translateY(-50%);
  background-color: transparent;
  background-image: url("../assets/crossed-eye.png");
  background-size: cover;
  border: none;
  cursor: pointer;
}

.has-error {
  border-color: red;
}

.login-stretched-wrapper {
  grid-column: span 2;
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
}

.login-stretched-wrapper input {
  flex: 1;
  min-width: 0;
  width: 0;
}

.last-column-container {
  display: flex;
  gap: 10px;
  min-width: 0;
}

.delete-button {
  width: 46px;
  height: 46px;
  padding: 0;
}

.delete-button img {
  width: 100%;
  height: 100%;
  background-color: rgb(221, 221, 221);
  border-radius: 8px;
}
</style>
