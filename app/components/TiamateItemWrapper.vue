<script setup lang="ts">
import type { ContextMenuItem, DropdownMenuItem, InputMenuItem } from '@nuxt/ui';
import type { Student } from '../classes/tiamate/student';
type Item = DropdownMenuItem | ContextMenuItem | InputMenuItem
const props = defineProps<{
  type: "student" | "students",
  student?: Student,
  students?: Student[],
  
}>()
</script>
<template>
  <slot ></slot>
</template>