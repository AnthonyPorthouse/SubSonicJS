function getJSON(url, data) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();

    var query = [];
    for (var key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    url = url + '?' + query.join('&');

    req.open('GET', url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

onconnect = function (e) {
  var port = e.ports[0];

  port.onmessage = function(e) {
    var url = e.data.url;
    var data = e.data.data;

    getJSON(url, data).then(function (data) {
      data = JSON.parse(data);
      port.postMessage(data);
    });
  }

  port.start();
}
