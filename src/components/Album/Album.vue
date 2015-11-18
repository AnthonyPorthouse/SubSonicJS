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

<template>
  <h2 class="display-4">{{ album.name }}</h2>

  <table class="table table-striped">
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
        <td>
          {{ song.discNumber }}
        </td>
        <td>
          {{ song.track }}
        </td>
        <td>
          {{ song.title }}
        </td>
        <td>
          {{ song.artist }}
        </td>
        <td>
          {{ Math.floor(song.duration / 60) }}:{{ song.duration % 60 }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
