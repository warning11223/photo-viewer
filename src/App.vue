<script setup>
import Table from '@/components/Table.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useThemeStore } from '@/stores/theme.js'

const themeStore = useThemeStore()

const toggleTheme = themeStore.toggleTheme
</script>

<template>
  <div class="container bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <header class="sticky top-0 p-2 z-10">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">Photo viewer</h1>
        <ThemeToggle @click="toggleTheme" />
      </div>
    </header>

    <main>
      <Table />
    </main>
  </div>
</template>
