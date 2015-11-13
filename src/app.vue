<script>
var Hashes = require('jshashes');
var MD5 = new Hashes.MD5();
var $ = require('jquery');

import ArtistList from './components/ArtistList.vue';

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
    }
  },

  events: {
    getArtist: function (id) {
      this.getArtist(id);
    }
  },

  methods: {
    login: function(event) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      $.ajax({
        url: self.authentication.server + '/rest/ping.view',
        dataType: 'jsonp',
        data: {
          f: 'jsonp',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs'
        }
      }).done(function(data) {
        data = data['subsonic-response'];

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
      });
    },

    getArtists: function(event) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      $.ajax({
        url: self.authentication.server + '/rest/getIndexes.view',
        dataType: 'jsonp',
        data: {
          f: 'jsonp',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs'
        }
      }).done(function(data) {
        data = data['subsonic-response'];

        self.artists = data.indexes.index;
      });
    },
    getArtist: function(id) {
      var self = this;
      var salt = Math.random().toString(36).substring(7);
      var token = MD5.hex(
        self.authentication.password + salt
      );

      $.ajax({
        url: self.authentication.server + '/rest/getArtist.view',
        dataType: 'jsonp',
        data: {
          f: 'jsonp',
          v: '1.13.0',
          u: self.authentication.username,
          t: token,
          s: salt,
          c: 'subsonicjs',
          id: id
        }
      }).done(function(data) {
        data = data['subsonic-response'];

        console.log(data);
      });
    }
  },

  components: {
    'artist-list': ArtistList
  }
};
</script>

<template>
  <nav class="navbar navbar-light">
    <a href="#" class="navbar-brand">SubSonicJS</a>

    <form class="form-inline navbar-form pull-right">
      <input class="form-control" type="text" name="server" id="server" v-model="authentication.server">
      <input class="form-control" type="text" name="username" id="username" v-model="authentication.username">
      <input class="form-control" type="password" name="password" id="password" v-model="authentication.password">
      <button class="btn btn-success-outline" id="login" v-on:click.prevent="login">Login</button>
    </form>
  </nav>

  <div class="container-fluid" v-if="authenticated">
    <div class="col-lg-2">
      <artist-list :artists="artists"></artist-list>
    </div>

    <div class="col-lg-10">
    </div>
  </div>
</template>
