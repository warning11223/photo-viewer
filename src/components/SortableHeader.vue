<script setup>
import { ArrowUp, ArrowDown } from 'lucide-vue-next'
import { TableHead } from '@/components/ui/table/index.js'

const props = defineProps({
  fieldName: {
    type: String,
    required: true
  },
  displayText: {
    type: String,
    required: true
  },
  sortField: {
    type: String,
    required: true
  },
  sortOrder: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['sort'])

const handleClick = () => {
  emit('sort', props.fieldName)
}
</script>

<template>
  <TableHead class="cursor-pointer select-none" @click="handleClick">
    <div class="flex items-center gap-0.5 text-[var(--sidebar-accent)]">
      {{ displayText }}
      <div class="flex">
        <ArrowUp
          size="10"
          :class="sortField !== fieldName ? 'text-gray-400' : 'hidden'"
        />
        <ArrowDown
          size="10"
          :class="sortField !== fieldName ? 'text-gray-400' : 'hidden'"
        />
      </div>

      <span v-if="sortField === fieldName && sortOrder === 'asc'">
        <ArrowUp size="10" class="text-[var(--sidebar-accent)]" />
      </span>
      <span v-else-if="sortField === fieldName && sortOrder === 'desc'">
        <ArrowDown size="10" class="text-[var(--sidebar-accent)]" />
      </span>
    </div>
  </TableHead>
</template>
