<script>
  export default {
    data: function () {
      return {
        songs: [],
        currentSong: 0
      }
    }

    methods: {
      addSong: function(song) {
        songs.push(song);
      }

      getCurrentSong: function() {
        return this.songs[this.currentSong];
      }

      playSong: function(i) {

      }
    }
  }
</script>
