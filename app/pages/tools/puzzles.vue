<script setup lang="ts">
const { t } = useLanguageStore()
const minuteCrypticClue = ref('')
</script>
<template>
  <UPageSection
    title="Minute Cryptic"
  >
    <UInput
      v-model="minuteCrypticClue"
    ></UInput>
    <div class="flex justify-center">
      <UButton
        v-for="word in minuteCrypticClue.split(' ').map(x => ({
          text: x,
          color: 'neutral'
        }))"
        class="rounded-none first:rounded-l last:rounded-r"
        @click="word.color = 'primary'"
        size="xl"
      >
        <span>{{ word.text }}</span>
      </UButton>
    </div>
  </UPageSection>
</template>