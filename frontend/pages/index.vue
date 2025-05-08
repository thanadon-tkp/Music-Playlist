<script setup>
import { h, resolveComponent } from "vue";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const store = useStore();
const toast = useToast();

const addSongToPlaylist = async (playlistId, playlistName, songId) => {
  const data = {
    playlistId,
    songId,
  };

  const res = await store.addMusicPlaylist(data);
  if (res.status !== 200) {
    toast.add({
      title: "Something wrong.",
      description: res.data.message,
      icon: "material-symbols:error-outline-rounded",
      color: "error",
    });
    return;
  }

  toast.add({
    id: "add-song",
    title: `Added to ${playlistName}`,
    icon: "material-symbols:check-circle",
    color: "success",
  });
};
const createPlaylistAndaddSong = async (songId) => {
  const count = playlists.value?.length || 0;
  const data = {
    name: `My Playlist #${count + 1}`,
    playlistSongs: {
      create: [
        {
          song: {
            connect: {
              id: songId,
            },
          },
        },
      ],
    },
  };

  const res = await store.createPlaylist(data);
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

function getRowItems(row) {
  const objPlaylist = playlists.value.map((item) => ({
    label: item.name,
    onSelect() {
      addSongToPlaylist(item.id, item.name, row.original.id);
    },
  }));

  const children = [
    [
      {
        label: "New playlist",
        icon: "material-symbols:add-2-rounded",
        onSelect() {
          createPlaylistAndaddSong(row.original.id);
        },
      },
    ],
  ];
  if (objPlaylist.length) {
    children.push([...objPlaylist]);
  }
  return [
    {
      label: "Add to playlist",
      icon: "material-symbols:add-2-rounded",
      children: children,
    },
    {
      label: "Save to your Liked Songs",
      icon: "material-symbols:add-circle-outline-rounded",
    },
    {
      label: "Go to song radio",
      icon: "ix:radio-waves",
    },
  ];
}

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const playlists = computed(() => store.playlists);
const songs = computed(() => store.songs);

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
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => formatDuration(row.getValue("duration")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      );
    },
  },
];

onMounted(async () => {
  await store.getSongs();
});
</script>

<template>
  <div>
    <UTable :columns="columns" :data="songs">
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
    </UTable>
  </div>
</template>
