<script setup>
const route = useRoute();
const store = useStore();

const columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "album",
    header: "Album",
  },
  {
    accessorKey: "addedAt",
    header: "Date added",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => formatDuration(row.getValue("duration")),
  },
];

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const playlistById = computed(() => store.playlistById);
const songs = computed(() => {
  const data = playlistById.value?.playlistSongs || [];

  return data.map((item) => ({
    name: item.song.name,
    artist: item.song.artist,
    album: item.song.album,
    imageUrl: item.song.imageUrl,
    duration: item.song.duration,
    addedAt: item.addedAt,
  }));
});

onMounted(async () => {
  const id = route.params.id;
  await store.getPlaylistById({ id });
});
onUnmounted(() => {
  store.playlistById = null;
});
</script>

<template>
  <div >
    <UButton label="Back" to="/" :color="'neutral'" />
    <UTable v-if="songs.length" :columns="columns" :data="songs">
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <NuxtImg
            class="size-9 rounded"
            :src="row.original.imageUrl"
            placeholder="https://placehold.co/200x200"
          />
          <div class="flex flex-col">
            <p class="font-medium text-highlighted">
              {{ row.original.name }}
            </p>
            <p>
              {{ row.original.artist }}
            </p>
          </div>
        </div>
      </template>
      <template #addedAt-cell="{ row }"> {{ $moment(row.original.addedAt).format("DD/MM/YYYY") }} </template>
    </UTable>
  </div>
</template>
