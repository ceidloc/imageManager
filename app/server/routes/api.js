const express = require('express');
var rp = require('request-promise');
const fetch = require('node-fetch');
const app = express();
const router = new express.Router();
var headers = {'Content-Type': 'application/json'};
var name = '';


router.get('/dashboard', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];

    var schemaFetchUrl = 'http://data.c101.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "dashboard",
	        "columns": ['*'],
	        "order_by": ["-user_id"]
	    }})
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            console.error(data);
	            	    res.status(200).send(data);
	                },
	                (e) => {
	                    res.json('Error in fetching current schema: ' + err.toString());
	                })
	            .catch((e) => {
	                e.stack();
	                res.json('Error in fetching current schema: ' + e.toString());
	            });
	    },
	    (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	    })
	.catch((e) => {
	    e.stackTrace();
	    res.json('Error in fetching current schema: ' + e.toString());
	});
});

router.post('/gallery', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];
    var user_id = parseInt(req.body.user_id);
    //var user_id =38 ;
    
    var schemaFetchUrl = 'http://data.c101.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "Image",
	        "columns": ['*'],
                "where": {
                    "user_id": user_id
                },
	        "order_by": ["-image_id"]
	    }})
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            console.error(data);
                            console.error(user_id);
	            	    res.status(200).send(data);
	                },
	                (e) => {
	                    res.json('Error in fetching current schema: ' + err.toString());
	                })
	            .catch((e) => {
	                e.stack();
	                res.json('Error in fetching current schema: ' + e.toString());
	            });
	    },
	    (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	    })
	.catch((e) => {
	    e.stackTrace();
	    res.json('Error in fetching current schema: ' + e.toString());
	});
});

router.post('/addimage', (req, res) => {

    var user_id = parseInt(req.body.user_id);
    headers.Authorization = req.headers.authorization;
    //headers.Authorization = req.headers.authorization;
    //headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    //headers['X-Hasura-Role'] = "user";
    //headers['X-Hasura-User-Id'] = user_id;
    var url = req.body.url;
    var caption = req.body.caption;
    var description = req.body.description;
    
    //var user_id =38 ;
    //console.error(req.body);
    
    var schemaFetchUrl = 'http://data.c101.hasura.me/v1/query';
    var options = {
	method: 'POST',
        headers,
	body: JSON.stringify({
	    type: 'insert',     
	    args: {
	        "table":"Image",
	        "objects":[
		    {
			"user_id": user_id,
			"caption": caption,
			"url": url,
			"description": description
			
		}
	   ],
	   "returning": ["image_id"]
	}
        })
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            console.error("here");
                            console.error(data);
                            console.error(image_id);
	            	    res.status(200).send(data);
	                },
	                (e) => {
	                    res.json('Error in fetching current schema: ' + err.toString());
	                })
	            .catch((e) => {
                        console.error(e);
                        res.status(200).send();
	            });
	    },
	    (e) => {
	        console.error(e);
	        res.json('Error in fetching current schema: ' + e.toString());
	    })
	.catch((e) => {
	    e.stackTrace();
	    res.json('Error in fetching current schema: ' + e.toString());
	});
});

module.exports = router;
