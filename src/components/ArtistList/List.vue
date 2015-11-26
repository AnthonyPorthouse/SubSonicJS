<script>

import Artist from './Artist.vue'

export default {
  props: ['artists'],

  data: function() {
    return {
      active: 0
    }
  },

  methods: {
    getArtist: function(id) {
      this.$dispatch('getArtist', id);
    }
  },

  events: {
    activeArtistChanged: function(id) {
      this.active = id;
    }
  },

  components: {
    artist: Artist
  }
};
</script>

<template>
  <ul class="menu vertical" id="artist-list">

    <template v-for="(index, group) in artists">
      <li class="header">
        <a href="#">{{ group.name }}</a>
      </li>

      <artist :active="artist.id == active" :artist="artist" v-for="artist in group.artist"></artist>
    </template>
  </ul>
</template>
