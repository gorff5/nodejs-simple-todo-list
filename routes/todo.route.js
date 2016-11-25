var express = require('express');
var router = express.Router();
var todoService = require('../services/todo.service');


/* GET todo objects. */
router.get('/', function(req, res, next) {
    todoService.getAll().then(_finish).catch(_error);

    // On promise finish
    function _finish(data) {
        res.send(data);
    }

    // On promise error
    function _error(error) {
        res.send(error);
    }

});


/* POST todo object. */
router.post('/', function(req, res, next) {
    todoService.addTodo(req.body).then(_finish).catch(_error);

    // On promise finish
    function _finish(data) {
        res.send(data);
    }

    // On promise error
    function _error(error) {
        res.send(error);
    }

});

/* DELETE todo object. */
router.delete('/:id', function(req, res, next) {
    todoService.deleteTodo(req.params.id).then(_finish).catch(_error);

    // On promise finish
    function _finish(data) {
        res.send(data);
    }

    // On promise error
    function _error(error) {
        res.send(error);
    }

});

module.exports = router;
