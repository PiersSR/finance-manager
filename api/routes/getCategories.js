var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.get("/", function(request, response) {
    pool.query("call GetCategories()",
        function(error, result) {
            if (error) {
                response.status(400).send({ message: 'Something went wrong whilst getting categories: ' + error.message });
            } else {
                response.status(200).json(result);
            }
        }
    )
});

module.exports = router;