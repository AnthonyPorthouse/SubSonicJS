<script>
export default {
  props: ['album'],

  data: function() {
    return {
      albumArt: {}
    };
  },

  created: function () {
    this.getAlbumArt(this.album.coverArt);
  },

  methods: {
    getAlbumArt: function(id) {
      if (id === undefined) {
        return false;
      }

      this.$dispatch('getAlbumArt', id);
    }
  },

  events: {
    getAlbumArt: function(albumArt) {
      if (this.album.coverArt == albumArt.id) {
        this.albumArt = albumArt;
      }
    }
  }
};
</script>

<style>
  .album-art {
    width: 100%;
    height: auto;
  }
</style>

<template>
  <div class="col-md-3">
    <div class="card">
      <img v-if="albumArt.url" class="card-img-top album-art" v-bind:src="albumArt.url" alt="{{ album.name }}" />
      <div class="card-block">
        <h4 class="card-title">{{ album.name }}</h4>
        <p class="card-text">{{ album.year }}</p>
      </div>
    </div>
  </div>
</template>
