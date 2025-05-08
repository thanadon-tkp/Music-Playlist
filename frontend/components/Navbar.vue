<script setup>
const toast = useToast();
const store = useStore();

const playlists = computed(() => store.playlists);

const items = ref([
  [
    {
      label: "Remove from profile",
      icon: "material-symbols:account-circle-outline",
    },
  ],
  [
    {
      label: "Edit details",
      icon: "lucide:pen",
    },
    {
      label: "Delete",
      icon: "fluent:block-24-regular",
    },
    {
      label: "Collapse Pinned Tabs",
      disabled: true,
    },
  ],
]);

const createPlaylist = async () => {
  const count = playlists.value?.length || 0;
  const body = {
    name: `My Playlist #${count + 1}`,
  };

  const res = await store.createPlaylist(body);
  if (res.status !== 200) {
    toast.add({
      title: "Something wrong.",
      description: res.statusText,
      icon: "material-symbols:error-outline-rounded",
      color: "error",
    });
    return;
  }
  await store.getPlaylist();
};

onMounted(async () => {
  await store.getPlaylist();
});
</script>

<template>
  <nav class="w-96 rounded-lg bg-[#121212]">
    <div class="flex justify-between gap-2 px-4 py-3">
      <!-- title -->
      <h1 class="font-bold">Your Library</h1>
      <!-- btn create -->
      <UButton
        size="lg"
        class="rounded-full font-medium bg-[#1f1f1f] hover:bg-[#282828] duration-200 px-4 cursor-pointer"
        variant="soft"
        color="neutral"
        icon="material-symbols:add-2-rounded"
        @click="createPlaylist()"
      >
        Create
      </UButton>
    </div>
    <!-- list -->
    <ul class="p-2">
      <template v-for="playlist in playlists">
        <!-- menu -->
        <UContextMenu
          :items="items"
          :ui="{
            content: 'w-60',
          }"
        >
          <!-- card -->
          <NuxtLink
            :to="`/playlist/${playlist.id}`"
            class="grid grid-cols-[auto_1fr] gap-3 hover:bg-[#2A2A2A] p-2 rounded-md cursor-pointer"
          >
            <NuxtImg
              class="size-12 rounded"
              placeholder="https://placehold.co/200x200"
            />
            <div class="grid grid-cols-1">
              <p class="truncate">{{ playlist.name }}</p>
              <span class="text-sm text-[#b3b3b3]">Playlist</span>
            </div>
          </NuxtLink>
        </UContextMenu>
      </template>
    </ul>
  </nav>
</template>
