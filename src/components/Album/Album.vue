<script>
  export default {
    props: ['album'],

    methods: {
      playSong: function(song) {
        this.$dispatch('playSong', song);
      }
    }
  }
</script>

<style>
  .tracklist {
    width: 100%;
  }
</style>

<template>
  <h2>{{ album.name }}</h2>

  <table class="tracklist">
    <thead>
      <tr>
        <th>
          Disc Number
        </th>
        <th>
          Track Number
        </th>
        <th>
          Track Name
        </th>
        <th>
          Artist Name
        </th>
        <th>
          Duration
        </th>
      </tr>
    </thead>

    <tbody>
      <tr @click.prevent="playSong(song)" data-song-id="{{ song.id }}" v-for="song in album.song">
        <td class="text-right">
          {{ song.discNumber }}
        </td>
        <td class="text-right">
          {{ song.track }}
        </td>
        <td>
          {{ song.title }}
        </td>
        <td>
          {{ song.artist }}
        </td>
        <td>
          {{ Math.floor(song.duration / 60) }}:{{ ("0" + (song.duration % 60)).slice(-2) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
