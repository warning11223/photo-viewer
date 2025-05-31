<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input/index.js'
import { Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { vInfiniteScroll } from '@vueuse/components'
import { useTableStore } from '@/stores/table.js'
import { storeToRefs } from 'pinia'
import SortableHeader from '@/components/SortableHeader.vue'

const tableStore = useTableStore()

const {
  photos,
  searchQuery,
  showSkeletons,
  sortField,
  sortOrder
} = storeToRefs(tableStore)
</script>

<template>
  <div class="flex gap-5">
    <div class="relative w-[100%] max-w-[100%] items-center">
      <Input
        v-model="searchQuery"
        id="search"
        type="text"
        placeholder="Поле для ввода ID альбома (например, '1 2 3')"
        class="pl-10 shadow-none border-[color:var(--sidebar-accent)]"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <Button
      @click="tableStore.onSearchClick"
      variant="secondary"
      class="cursor-pointer bg-gray-600 dark:bg-gray-100 dark:text-gray-700 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200"
    >
      Поиск
    </Button>
  </div>

  <div
    v-infinite-scroll="[tableStore.loadPhotos, { distance: 50, canLoadMore: tableStore.canLoadMore }]"
    class="overflow-auto max-h-[55vh] mt-2"
    style="margin-top: 10px"
    id="table-scroll-top"
  >
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader
            field-name="id"
            display-text="ID"
            :sort-field="sortField"
            :sort-order="sortOrder"
            @sort="tableStore.toggleSort"
          />
          <SortableHeader
            field-name="albumId"
            display-text="Альбом"
            :sort-field="sortField"
            :sort-order="sortOrder"
            @sort="tableStore.toggleSort"
          />
          <SortableHeader
            field-name="title"
            display-text="Название"
            :sort-field="sortField"
            :sort-order="sortOrder"
            @sort="tableStore.toggleSort"
          />
          <TableHead class="sticky top-0 bg-gray-600 dark:bg-gray-100 dark:text-gray-700 text-gray-100">
            Ссылка
          </TableHead>
          <TableHead class="sticky top-0 text-right bg-gray-600 dark:bg-gray-100 dark:text-gray-700 text-gray-100">
            Миниатюра
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="showSkeletons">
          <TableRow v-for="n in 14" :key="'skeleton-' + n">
            <TableCell class="max-w-[20px] h-[36.7px]">
              <div class="skeleton w-full h-4 rounded"></div>
            </TableCell>
            <TableCell class="max-w-[20px] h-[36px]">
              <div class="skeleton w-full h-4 rounded"></div>
            </TableCell>
            <TableCell class="min-w-[140px] h-[36px]">
              <div class="skeleton w-full h-4 rounded"></div>
            </TableCell>
            <TableCell class="min-w-[140px] h-[36px]">
              <div class="skeleton w-full h-4 rounded"></div>
            </TableCell>
            <TableCell class="min-w-[140px] text-right h-[36px]">
              <div class="skeleton w-full h-4 rounded ml-auto"></div>
            </TableCell>
          </TableRow>
        </template>

        <template v-else>
          <TableRow v-for="item in photos" :key="item.id">
            <TableCell class="max-w-[50px] font-medium">{{ item.id }}</TableCell>
            <TableCell class="max-w-[50px]">{{ item.albumId }}</TableCell>
            <TableCell class="max-w-[140px] truncate" :title="item.title">{{ item.title }}</TableCell>
            <TableCell class="max-w-[140px] truncate" :title="item.url">{{ item.url }}</TableCell>
            <TableCell class="max-w-[140px] text-right truncate" :title="item.thumbnailUrl">
              {{ item.thumbnailUrl }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>

    </Table>
  </div>
</template>
