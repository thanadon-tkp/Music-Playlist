<script setup>
const progress = ref(0);
</script>

<template>
  <footer class="grid grid-cols-3 left-0 bottom-0 right-0 p-2 w-full h-fit">
    <div></div>
    <div class="flex flex-col">
      <!-- controler -->
      <div class="grid grid-cols-[1fr_auto_1fr] gap-4 mb-2">
        <div class="flex justify-end gap-2">
          <!-- shuffle -->
          <UButton
            disabled
            icon="iconamoon:playlist-shuffle-fill"
            color="none"
            class="text-base p-2 text-[#4d4d4d]"
          ></UButton>
          <!-- skip back -->
          <UButton
            disabled
            icon="tabler:player-skip-back-filled"
            color="none"
            class="text-base p-2 text-[#4d4d4d]"
          ></UButton>
        </div>
        <!-- play -->
        <UButton
          disabled
          icon="material-symbols:pause-circle"
          color="none"
          class="text-[2rem] p-0 text-[#4d4d4d]"
        ></UButton>
        <div class="flex justify-start gap-2">
          <!-- skip -->
          <UButton
            disabled
            icon="tabler:player-skip-forward-filled"
            color="none"
            class="text-base p-2 text-[#4d4d4d]"
          ></UButton>
          <!-- repeat -->
          <UButton
            disabled
            icon="tabler:repeat"
            color="none"
            class="text-base p-2 text-[#4d4d4d]"
          ></UButton>
        </div>
      </div>
      <!-- progress -->
      <div class="flex justify-between items-center gap-2">
        <span class="min-w-10 text-end text-xs text-[#b3b3b3]">-:--</span>
        <UProgress
          size="sm"
          v-model="progress"
          :ui="{
            base: 'bg-[#4d4d4d]',
          }"
        />
        <span class="min-w-10 text-xs text-[#b3b3b3]">--:-</span>
      </div>
    </div>
    <div></div>
  </footer>
</template>
