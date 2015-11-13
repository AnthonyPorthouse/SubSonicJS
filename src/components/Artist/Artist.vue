<script>

import Album from './Album.vue';

export default {
  props: ['artist'],

  components: {
    album: Album
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
    <album :album="album" v-for="album in row"></album>
  </div>
</template>
