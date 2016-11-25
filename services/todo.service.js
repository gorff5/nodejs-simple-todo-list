var express = require('express');
var storageService = require('./storage.service');
var q = require('q');

var todoService = {
    getAll: getAll,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
};


function getAll(callback) {
    var deferred = q.defer();

    return storageService.getJson().then(ok).catch(error);

    function ok(list) {
        return list;
    }

    function error(error) {
        throw error;
    }
}


function addTodo(newTodo) {
    return this.getAll().then(addToList);

    function addToList(list) {
        newTodo.id = _getLastId(list) + 1;
        list.push(newTodo);
        return storageService.setJson(list).then(finishedUpdateStorage);
    }

    function finishedUpdateStorage(data) {
        return data;
    }
}


function deleteTodo(id) {
    return this.getAll().then(deleteFromList);

    function deleteFromList(list) {
        var index = _getObjectIndexById(list, id);
        list.splice(index, 1);
        return storageService.setJson(list).then(finishedUpdateStorage);
    }

    function finishedUpdateStorage(data) {
        return data;
    }
}

/////////// PRIVATE FUNCTIONS

function _getLastId(array) {
    if (array && array.length !== 0) {
        var id = array[array.length - 1].id;
        if (id) {
            return id;
        }
    }
    return 0;
}


function _getObjectIndexById(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return i;
        }
    }
    throw "not found";
}

module.exports = todoService;
