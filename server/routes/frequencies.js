var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.param('userId', function(request, response, next, id) {
    request.userId = id;
    next();
})

router.param('frequencyId', function(request, response, next, id) {
    request.frequencyId = id;
    next();
})

router.route('/:userId/:frequencyId')
    .all(function(request, response, next) {
        next();
    })
    .delete(function(request, response, next) {
        pool.query("CALL DeleteFrequency(?, ?)",
            [
                request.frequencyId,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst deleting a frequency: ' + error.message })
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })

router.route('/:userId')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        pool.query("call GetFrequencies(?)",
            request.userId,
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst getting frequencies: ' + error.message });
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })
    .put(function(request, response, next) {
        pool.query("CALL AddFrequency(?, ?)",
            [
                request.body.inFrequency,
                request.userId
            ],
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst adding a frequency: ' + error.message });
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })
    .post(function(request, response, next) {
        pool.query("CALL EditFrequency(?, ?)",
            [
                request.body.inFrequencyID,
                request.body.inFrequency
            ],
            function(error, result) {
                if (error) {
                    response.status(400).send({ message: 'Something went wrong whilst editing a frequency: ' + error.message });
                } else {
                    response.status(200).json(result);
                }
            }
        )
    })

module.exports = router;