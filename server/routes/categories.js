var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
})

router.param('categoryId', function(request, response, next, id) {
    request.categoryId = id;
    next();
})

router.route('/:userId/:categoryId')
    .all(function(request, response, next) {
        next();
    })
    .delete(function(request, response, next) {
        pool.query("CALL DeleteCategory(?, ?)",
            [
                request.categoryId,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst deleting a category: ' + error.message })
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })

router.route('/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetCategories(?)",
            request.userId,
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst getting categories: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })
    .put(function(request, response, next) {
        pool.query("CALL AddCategory(?, ?)",
            [
                request.body.inCategory,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst adding a category: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })
    .post(function(request, response, next) {
        pool.query("CALL EditCategory(?, ?)",
            [
                request.body.inCategoryID,
                request.body.inCategory
            ],
            function(error, result) {
                if (error) {
                    response.status(401).send({ message: 'Something went wrong whilst editing a category: ' + error.message });
                } else {
                    response.status(201).json(result);
                }
            }
        )
    })

module.exports = router;