<script>
export default {
  props: ['artist', 'active'],

  methods: {
    getArtist: function(id) {
      this.$dispatch('getArtist', id);
      this.$dispatch('activeArtistChanged', this.artist.id);
    },
  }
};
</script>

<template>
  <li>
    <a href="#"
      data-artist-id="{{ artist.id }}"
      class="list-group-item"
      v-bind:class="{ 'active': this.active }"
      @click.prevent="getArtist(artist.id)">
      {{ artist.name }}
    </a>
  </li>
</template>
