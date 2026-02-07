<script setup>
import UsersForm from './components/UsersForm.vue';

accountStore.loadFromStorage();
</script>

<template>
    <UsersForm form-title="Учетные записи" hint-text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"/>
</template>


