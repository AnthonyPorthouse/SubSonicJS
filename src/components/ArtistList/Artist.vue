<script>
export default {
  props: ['artist'],

  methods: {
    getArtist: function(id) {
      this.$dispatch('getArtist', id);
    }
  }
};
</script>

<template>
  <a href="#" data-artist-id="{{ artist.id }}" class="list-group-item" v-on:click.prevent="getArtist(artist.id)">
    {{ artist.name }}
  </a>
</template>
