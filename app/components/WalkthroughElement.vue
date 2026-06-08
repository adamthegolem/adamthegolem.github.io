<script setup lang="ts">
import type { Walkthrough } from '../classes/walkthrough';

const { t } = useLanguageStore()
const props = defineProps<{
  id: string,
  walkthrough: Walkthrough,
  description?: string,
  title?: string,
  icon?: string,
  hide?: boolean,
  highlight?: boolean,
  ui?: {
    container?: string,
  },
  content?: {
    side?: ("left" | "right" | "top" | "bottom") | undefined;
    sideOffset?: number | undefined;
    sideFlip?: boolean | undefined;
    align?: ("end" | "start" | "center") | undefined;
    alignOffset?: number | undefined;
    alignFlip?: boolean | undefined;
    avoidCollisions?: boolean | undefined;
    collisionBoundary?: (Element | null | Array<Element | null>) | undefined;
    collisionPadding?: (number | Partial<Record<"left" | "right" | "top" | "bottom", number>>) | undefined;
    arrowPadding?: number | undefined;
    sticky?: "partial" | "always" | undefined;
    hideWhenDetached?: boolean | undefined;
    positionStrategy?: "absolute" | "fixed" | undefined;
    updatePositionStrategy?: "optimized" | "always" | undefined;
    disableUpdateOnLayoutShift?: boolean | undefined;
    prioritizePosition?: boolean | undefined;
    disableOutsidePointerEvents?: boolean | undefined;
  }
  list?: {
    label: string,
    icon?: string,
  }[]
}>()
const open = ref(true)
const emit = defineEmits<{
  (e: "activated"): void,
  (e: "deactivated"): void,
}>()
const isCurrent = computed(() => {
  return props.walkthrough.isCurrent(props.id)
})
watch(isCurrent, (value, oldValue) => {
  if (oldValue && !value) {
    emit("deactivated")
  }
  else if (!oldValue && value) {
    console.log("Activated")
    emit("activated")
  }
})
</script>
<template>
  <template class="z-40" v-if="isCurrent">
    <div
      class="fixed z-40 top-0 bottom-0 left-0 right-0 bg-black/50 light:bg-black/20"
    ></div>
    <UPopover
      v-model:open="open"
      :dismissible="false"
      arrow
      :content="{
        sideOffset: 16,
        ...content
      }"
    >
      <div
        :data-highlight="highlight"
        :class="`z-40 relative data-[highlight=true]:bg-default data-[highlight=true]:rounded-sm pointer-events-none data-[highlight=true]:ring-0 data-[highlight=true]:ring-transparent data-[highlight=true]:ring-offset-10 data-[highlight=true]:ring-offset-bg ${ui?.container || ''}`"
      >
        <slot></slot>
      </div>
      <template #content>
        
        <div
          class="absolute z-50 p-1 w-full flex items-center justify-between"
        >
          <span class="text-dimmed text-sm inline-block px-2">{{ walkthrough.index + 1 }}/{{ walkthrough.items.length }}</span>
          <UButton
            icon="lucide:x"
            variant="ghost"
            color="neutral"
            @click="walkthrough.reset()"
          ></UButton>
        </div>
        <UEmpty
          variant="naked"
          :icon="icon"
          :title="t(title)"
          :description="t(description)"
          :ui="{
            actions: 'w-full',
            body: 'w-full',
            root: 'max-w-100',
            description: 'text-balance'
          }"
        >
          <template #description>
            <div class="flex flex-col gap-2">
              <p v-if="description">
                {{ t(description) }}
              </p>
              <slot v-else name="description"></slot>
              <div v-if="list"
                class="flex gap-2 justify-center flex-wrap"
              >
                <template
                  v-for="item in list"
                >
                  <!-- <UIcon :name="item.icon"></UIcon>{{ t(item.label) }} -->
                  <UBadge
                    :icon="item.icon"
                    :label="t(item.label)"
                    color="neutral"
                    variant="outline"
                  ></UBadge>
                </template>
              </div>
            </div>
          </template>
          <template #actions>
            <div class="flex gap-2 items-center justify-end w-full">
              <UButton
                v-if="walkthrough.index > 0"
                color="primary"
                variant="link"
                :label="t('Back||Tilbage')"
                @click="walkthrough.back()"
              ></UButton>
              <UButton
                v-if="walkthrough.index + 1 < walkthrough.items.length"
                variant="soft"
                :label="t('Next||Videre')"
                trailing-icon="lucide:arrow-right"
                @click="walkthrough.next()"
              ></UButton>
              <UButton
                v-else
                variant="soft"
                :label="t('Got it||Forstået')"
                trailing-icon="lucide:check"
                @click="walkthrough.reset()"
              ></UButton>
            </div>
          </template>
        </UEmpty>
      </template>
    </UPopover>
  </template>
  <slot v-else-if="!hide"></slot>
</template>