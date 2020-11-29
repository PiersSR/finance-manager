var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
})

router.route('/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetCategories()",
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst getting categories: ' + error.message });
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })
    .put(function(request, response, next) {
        next(new Error('Put method not implemented'));
    })
    .post(function(request, response, next) {
        next(new Error('Post method not implemented'))
    })
    .delete(function(request, response, next) {
        next(new Error('Delete method not implemented'));
    })

module.exports = router;