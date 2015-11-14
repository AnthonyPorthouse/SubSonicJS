<script>

import AlbumCover from './AlbumCover.vue';

export default {
  props: ['artist'],

  components: {
    "album-cover": AlbumCover
  },

  methods: {
    getAlbum: function(id) {
      this.$dispatch('getAlbum', id);
    }
  },

  computed: {
    albums: function () {

      if (!this.artist.album) {
        return [];
      }

      var albums = this.artist.album;
      var returned = [];

      while (albums.length > 0) {
        returned.push(albums.splice(0, 4));
      }

      return returned;
    }
  }
}
</script>

<template>
  <h1 class="display-1">{{ artist.name }}</h1>

  <div class="row" v-for="row in albums">
    <album-cover @click.prevent="getAlbum(album.id)" :album="album" v-for="album in row"></album>
  </div>
</template>
