<script>
  var moment = require('moment');
  require("moment-duration-format");

  export default {
    props: ['album'],

    methods: {
      playSong: function(song) {
        this.$dispatch('playSong', song);
      },
      getTime: function(song) {
        let time = moment.duration(song.duration, 'seconds');
        return time.format('h:m:ss');
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
  <h1>{{ album.artist }}</h1>
  <h2>{{ album.name }}</h2>
  <h3>{{ album.year }}</h3>

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
        <td class="text-right">
          {{ getTime(song) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
