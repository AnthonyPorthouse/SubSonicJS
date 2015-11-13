<script>

export default {
  props: ['artists'],

  methods: {
    getArtist: function(id) {
      this.$dispatch('getArtist', id);
    }
  }
};
</script>

<template>
  <ul class="list-group" id="artist-list">
    <li class="list-group-item" v-for="(index, group) in artists">
      {{ group.name }}

      <div class="list-group" id="artist-list-{{ index }}">
        <a href="#" data-artist-id="{{ artist.id }}" class="list-group-item" v-for="artist in group.artist" v-on:click.prevent="getArtist(artist.id)">
          {{ artist.name }}
        </a>
      </div>
    </li>
  </ul>
</template>
