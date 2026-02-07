import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserAccount } from '../types/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<UserAccount[]>([])
  const STORAGE_KEY = 'user_accounts'

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      accounts.value = JSON.parse(stored)
    }
  }
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  }
  function addAccount() {
    const newAccount: UserAccount = {
        id: crypto.randomUUID(),
        tags: [],
        type: 'Локальная',
        login: '',
        password: ''
      }
      accounts.value.push(newAccount)
      // Не сохраняем в localStorage сразу, т.к. нет логина и пароля
  }

  function updateAccount(id: string, data: Partial<Omit<UserAccount, 'id'>>) {
    const index = accounts.value.findIndex(acc => acc.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...data }
      saveToStorage()
    }
  }

  function deleteAccount(id: string) {
    accounts.value = accounts.value.filter(acc => acc.id !== id)
    saveToStorage()
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    loadFromStorage
  }
})