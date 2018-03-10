'use strict';

function $http(url) {

    var core = {

        ajax: function (method, url, args) {

            var promise = new Promise(function (resolve, reject) {

                var client = new XMLHttpRequest();
                var uri = url;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    } else {
                        reject(this.statusText);
                    }
                };

                client.onerror = function () {
                    reject(this.statusText);
                };
            });

            return promise;
        }
    };

    return {
        'get': function (args) {
            return core.ajax('GET', url, args);
        },
        'post': function (args) {
            return core.ajax('POST', url, args);
        },
        'put': function (args) {
            return core.ajax('PUT', url, args);
        },
        'delete': function (args) {
            return core.ajax('DELETE', url, args);
        }
    };
};

var url = 'https://api.worldoftanks.ru/wot/encyclopedia/vehicles/?application_id=cf53b4423e410f4072fdf9435940c731&language=ru&tank_id=';
var payload = {};
