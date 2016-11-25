var express = require('express');
var fs = require('fs');
var q = require('q');

const LIST_JSON_PATH = './storage/list.json';

var storageService = {
    getJson: getJson,
    setJson: setJson,
};

function getJson() {
    var deferred = q.defer();

    fs.readFile(LIST_JSON_PATH, 'utf8', function (err, data) {
        if (err) {
            deferred.rejact(err);
        }
        data = JSON.parse(data);
        deferred.resolve(data);
    });

    return deferred.promise;
}

function setJson(json) {
    var deferred = q.defer();
    var jsonStringify = JSON.stringify(json);

    fs.writeFile(LIST_JSON_PATH, jsonStringify, function (err) {
        if (err) {
            deferred.rejact(err);
        }
        deferred.resolve(json);
    });
    return deferred.promise;
}


module.exports = storageService;
