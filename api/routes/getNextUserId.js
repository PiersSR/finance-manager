var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.get("/", function(request, response) {
    pool.query("call GetNextUserID()",
        function(error, result) {
            if (error) {
                response.status(400).send({ message: 'Something went wrong whilst getting the next user Id: ' + error.message });
            } else {
                response.json(result);
            }
        }
    )
});

module.exports = router;