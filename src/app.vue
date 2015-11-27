<script>
var Hashes = require('jshashes');
var MD5 = new Hashes.MD5();

var AjaxWorker = require('shared-worker?inline=true!./workers/ajaxWorker');
var ajaxWorker = new AjaxWorker();
ajaxWorker.port.start();

import ArtistList from './components/ArtistList/List.vue';
import Artist from './components/Artist/Artist.vue';
import Album from './components/Album/Album.vue';

export default {

  // Initial data
  data: function() {
    return {
      // Server Authentication data
      authentication: {
        server: localStorage.server || '',
        username: localStorage.username || '',
        password: localStorage.password || ''
      },
      authenticated: false,
      artists: [],
      artist: {},
      album: {},
      state: undefined,
    }
  },

  ready: function() {
    if (
      this.authentication.server &&
      this.authentication.username &&
      this.authentication.password
    ) {
      this.login();
    }
  },

  events: {
    setState: function (state) {
      this.state = state;
    },
    getArtist: function (id) {
      this.getArtist(id);
      this.album = {};
    },
    getAlbum: function (id) {
      this.getAlbum(id);
    },
    getAlbumArt: function (id) {
      this.getAlbumArt(id);
    },
    playSong: function (song) {
      this.playSong(song);
    }
  },

  methods: {
    login: function(event) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      ajaxWorker.port.postMessage({
        url: self.authentication.server + '/rest/ping.view',
        data: {
          f: 'json',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs'
        }
      });
      ajaxWorker.port.onmessage = function(e) {
        var data = e.data['subsonic-response'];

        if (data.status !== 'ok') {
          self.authenticated = false;
          console.error('Failed to Authenticate', data.error);
        } else {
          // Store Authentication data
          localStorage.server = self.authentication.server;
          localStorage.username = self.authentication.username;
          localStorage.password = self.authentication.password;

          self.authenticated = true;
          self.getArtists();
        }
      }
    },

    getArtists: function(event) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      ajaxWorker.port.postMessage({
        url: self.authentication.server + '/rest/getArtists.view',
        data: {
          f: 'json',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs'
        }
      });

      ajaxWorker.port.onmessage = function(e) {
        let data = e.data['subsonic-response'];
        self.artists = data.artists.index;
      }
    },
    getArtist: function(id) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      ajaxWorker.port.postMessage({
        url: self.authentication.server + '/rest/getArtist.view',
        data: {
          f: 'json',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs',
          id: id
        }
      });

      ajaxWorker.port.onmessage = function(e) {
        let data = e.data['subsonic-response'];
        self.artist = data.artist;
      }
    },
    getAlbum: function(id) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      ajaxWorker.port.postMessage({
        url: self.authentication.server + '/rest/getAlbum.view',
        data: {
          f: 'json',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs',
          id: id
        }
      });

      ajaxWorker.port.onmessage = function(e) {
        let data = e.data['subsonic-response'];
        self.album = data.album;
      }
    },
    getAlbumArt: function(id) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      var url = self.authentication.server + '/rest/getCoverArt.view?';

      url += 'f=json&v=1.13.0&c=subsonicjs';
      url += '&u=' + self.authentication.username;
      url += '&t=' + token;
      url += '&s=' + salt;
      url += '&id=' + id;

      self.$broadcast('getAlbumArt', {
        id: id,
        url: url
      });
    },
    playSong: function(song) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      var url = self.authentication.server + '/rest/stream.view?';

      url += 'f=json&v=1.13.0&c=subsonicjs';
      url += '&u=' + self.authentication.username;
      url += '&t=' + token;
      url += '&s=' + salt;
      url += '&id=' + song.id;
      url += '&format=mp3';

      var player = document.getElementById('player');
      player.src = url;
      player.play();
    },
  },

  components: {
    'artist-list': ArtistList,
    'artist': Artist,
    'album': Album,
  }
};
</script>

<template>
  <nav class="top-bar">

    <div class="top-bar-left">
      <ul class="menu">
        <li class="menu-text">SubSonicJS</li>
      </ul>
    </div>

    <div class="top-bar-right">
      <form>
        <ul class="menu">
          <li><input placeholder="Server URL" type="text" name="server" id="server" v-model="authentication.server"></li>
          <li><input placeholder="Username" type="text" name="username" id="username" v-model="authentication.username"></li>
          <li><input placeholder="Password" type="password" name="password" id="password" v-model="authentication.password"></li>
          <li><button class="button" id="login" v-on:click.prevent="login">Login</button></li>
        </ul>
      </form>
    </div>
  </nav>

  <div v-if="authenticated">
    <div class="row">
      <div class="medium-2 columns">
        <artist-list :artists="artists"></artist-list>
      </div>

      <div class="medium-10 columns">
        <artist :artist="artist" v-if="state == 'artist'"></artist>
        <album :album="album" v-if="state == 'album'"></album>
      </div>
    </div>

    <nav id="now-playing-bar" class="navbar navbar-fixed-bottom navbar-light bg-faded">
      <audio id="player"></audio>
    </nav>
  </div>
</template>

<style>
  body > .container-fluid {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
</style>
