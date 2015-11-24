<script>
  export default {
    data: function () {
      return {
        songs: [],
        currentSong: 0
      }
    },

    methods: {
      addSong: function(song) {
        this.songs.push(song);
      },

      addSongs: function (songs) {
        this.songs.push(this.songs, songs)
      },

      getCurrentSong: function() {
        return this.songs[this.currentSong];
      },

      playSong: function(i) {

      }
    }
  }
</script>
