export const useStore = defineStore("store", {
  state: () => ({
    playlists: [],
    songs: [],
    playlistById: null,
  }),
  actions: {
    async getPlaylist() {
      const api = useNuxtApp().$api;

      return await api
        .get("/api/playlist")
        .then((res) => {
          if (res?.status == 200) {
            this.playlists = res.data;
          }
          return res;
        })
        .catch((err) => err.response);
    },
    async getSongs() {
      const api = useNuxtApp().$api;

      return await api
        .get("/api/songs")
        .then((res) => {
          if (res?.status == 200) {
            this.songs = res.data;
          }
          return res;
        })
        .catch((err) => err.response);
    },
    async createPlaylist(payload) {
      const api = useNuxtApp().$api;

      return await api
        .post("/api/playlist/create", payload)
        .catch((err) => err.response);
    },
    async addMusicPlaylist(payload) {
      const api = useNuxtApp().$api;

      return await api
        .post("/api/playlist/add-music-by-id", payload)
        .catch((err) => err.response);
    },
    async getPlaylistById(params) {
      const api = useNuxtApp().$api;

      return await api
        .get("/api/playlist/by-id", { params })
        .then((res) => {
          if (res?.status == 200) {
            this.playlistById = res.data;
          }
          return res;
        })
        .catch((err) => err.response);
    },
  },
});
