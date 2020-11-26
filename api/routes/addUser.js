var express = require('express');
var router = express.Router();
var pool = require('../data/config');
var cookies = require('universal-cookie-express');

router.post("/", function(request, response) {
    pool.query("call AddUser(?, ?)", 
        [
            request.body.firstName,
            request.body.surname
        ],
        function(error, result) {
            if (error) {
                response.status(400).send( { message: 'Something went wrong whilst adding a user: ' + error.message });
            } else {
                response.status(200).json(result);
            }
        }
    )
});

module.exports = router;