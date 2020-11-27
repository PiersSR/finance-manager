var express = require('express');
var router = express.Router();
var pool = require('../data/config');

router.route('/')
  	.all(function(request, response, next) { 
		next();
  	})
  	.get(function(request, response, next) {
		pool.query("call GetNextUserID()",
			function(error, result) {
				if (error) {
					console.error(error.stack);
					response.status(400).send({ message: 'Something went wrong whilst getting the next user Id: ' + error.message });
				} else {
					response.status(200).json(result);
				}
			}
		)
	})
  	.put(function(request, response, next) {
		pool.query("call AddUser(?, ?)", 
			[
				request.body.inFirstName,
				request.body.inSurname
			],
			function(error, result) {
				if (error) {
					response.status(400).send( { message: 'Something went wrong whilst adding a user: ' + error.message });
				} else {
					response.status(200).json(result);
				}
			}
		)
	})
	.post(function(request, response, next) {
		next(new Error('Post method not implemented'));
	})
	.delete(function(request, response, next) {
		next(new Error('Delete method not implemented'));
	})

module.exports = router;
