<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <tr
    data-slot="table-row"
    :class="
      cn(
        'hover:bg-[color:var(--table-hover)] dark:hover:bg-[color:var(--table-dark-hover)] data-[state=selected]:bg-muted border-b border-b-[color:var(--sidebar-accent)] transition-colors',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
