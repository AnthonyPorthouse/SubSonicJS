<script>

import Artist from './Artist.vue'

export default {
  props: ['artists'],

  methods: {
    getArtist: function(id) {
      this.$dispatch('getArtist', id);
    }
  },

  components: {
    artist: Artist
  }
};
</script>

<template>
  <ul class="list-group" id="artist-list">

    <template v-for="(index, group) in artists">
      <li class="list-group-item">
        {{ group.name }}
      </li>

      <artist :artist="artist" v-for="artist in group.artist"></artist>
    </template>
  </ul>
</template>
