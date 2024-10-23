<template>
  <div>
    Home

    <div>{{ userStore.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUserStoreHook } from '@/store/user';

const userStore = useUserStoreHook();
</script>

<style scoped></style>
