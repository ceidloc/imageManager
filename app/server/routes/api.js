const express = require('express');
var rp = require('request-promise');
const fetch = require('node-fetch');
const app = express();
const router = new express.Router();
var headers = {'Content-Type': 'application/json'};
var name = '';
var isAnImageUrl = require('is-an-image-url');

router.get('/dashboard', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];

    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
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
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
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

router.post('/filterByTag', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];
    var user_id = parseInt(req.body.user_id);
    var tag_name = req.body.tag_name;
    //var user_id =38 ;
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "filterbytag",
	        "columns": ['*'],
                "where": {
                    "user_id": user_id,
                    "tag_name": tag_name
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

    //checking if entered url is valid
    isAnImageUrl(url, function(isAnImageResult){
        console.error("in url validator");
        if(!isAnImageResult){
            console.error("is not an image");
            const errors = {};
            errors.url = "incorrect image url";
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.',
                errors
            });
            
        }else{
                //var user_id =38 ;
            //console.error(req.body);
    
            var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
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
            
        }
    });

});

router.post('/viewimage', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];
    var image_id = parseInt(req.body.image_id);
    //var user_id =38 ;
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "Image",
	        "columns": ['*'],
                "where": {
                    "image_id": image_id
                }
	    }})
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            data=JSON.parse(data)
                            console.error("viewimageendpoint");
                            console.error(data);
	            	    res.status(200).send(data[0]);
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

router.post('/editimage', (req, res) => {

    var image_id = parseInt(req.body.image_id);
    headers.Authorization = req.headers.authorization;
    //headers.Authorization = req.headers.authorization;
    //headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    //headers['X-Hasura-Role'] = "user";
    //headers['X-Hasura-User-Id'] = user_id;
    var url = req.body.url;
    var caption = req.body.caption;
    var description = req.body.description;

    //checking if entered url is valid
    isAnImageUrl(url, function(isAnImageResult){
        console.error("in url validator");
        if(!isAnImageResult){
            console.error("is not an image");
            const errors = {};
            errors.url = "incorrect image url";
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.',
                errors
            });
            
        }else {
            var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
            var options = {
	        method: 'POST',
                headers,
	        body: JSON.stringify({
	            type: 'update',     
	            args: {                
                        "table":"Image",
		        "$set": {
                            "url":url,
                            "caption":caption,
                            "description":description
                        },
		        "where": {
		            "image_id": image_id
		        },
                        "returning": ["user_id"]
	            }	        	    
                })
            };
            
            fetch(schemaFetchUrl, options)
	        .then(
	            (response) => {
	                response.text()
	                    .then(
	                        (data) => {
                                    data=JSON.parse(data);
                                    console.error("in edit image");
                                    console.error(data);
                                    console.error(data.returning[0].user_id);
                                    var user_id = data.returning[0].user_id;
                                    console.error(user_id);
	            	            res.sendStatus(200).send(user_id);
	                        },
	                        (e) => {
	                            res.json('Error in fetching current schema: ' + err.toString());
	                        })
	                    .catch((e) => {
                                console.error(e);
                                res.sendStatus(200).send();
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
            
        }
        
    });
    //var user_id =38 ;
    //console.error(req.body);        
  
});

router.post('/deleteimage', (req, res) => {

    headers.Authorization = req.headers.authorization;
    //headers.Authorization = req.headers.authorization;
    //headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    //headers['X-Hasura-Role'] = "user";
    //headers['X-Hasura-User-Id'] = user_id;
    var image_id = parseInt(req.body.image_id);

    //var user_id =38 ;
    //console.error(req.body);
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
        headers,
	body: JSON.stringify({
	    type: 'delete',     
	    args: {
	        "table":"Image",
	        "where":
		    {
			"image_id": image_id,
		    }
	   
	    }
        })
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            console.error("delete image");
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

router.post('/getImageTags', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];
    var image_id = parseInt(req.body.image_id);
    //var user_id =38 ;
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "Image_Tag",
	        "columns": ['tag_name'],
                "where": {
                    "image_id": image_id
                },
	        "order_by": ["-tag_name"]
	    }})
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            data=JSON.parse(data)
                            console.error("in get tags of image \n\n");                            
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

router.post('/getAllTags', (req, res) => {
	
    headers.Authorization = 'Bearer ' + req.headers['x-hasura-session-id'];
    //headers.Authorization = req.headers.authorization;
    headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    headers['X-Hasura-User-Id'] = req.headers['x-hasura-user-id'];
    var image_id = parseInt(req.body.image_id);
    //var user_id =38 ;
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
	body: JSON.stringify({
	    type: 'select',
	    args: {
	        "table": "Tag",
	        "columns": ['tag_name'],
	        "order_by": ["-tag_name"]
	    }})
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            data=JSON.parse(data)
                            console.error("in get all tags name \n\n");                            
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

router.post('/addImageTag', (req, res) => {

    headers.Authorization = req.headers.authorization;
    //headers.Authorization = req.headers.authorization;
    //headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    //headers['X-Hasura-Role'] = "user";
    //headers['X-Hasura-User-Id'] = user_id;
    var image_id = parseInt(req.body.image_id);
    var tag_name = req.body.tag_name;

    //var user_id =38 ;
    //console.error(req.body);
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
        headers,
	body: JSON.stringify({
	    type: 'insert',     
	    args: {
	        "table":"Image_Tag",
	        "objects":[
		    {
			"image_id": image_id,
			"tag_name": tag_name		
		}
	   ]
	}
        })
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            data=JSON.parse(data);
                            console.error("in add tag api");
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

router.post('/deleteImageTag', (req, res) => {

    headers.Authorization = req.headers.authorization;
    //headers.Authorization = req.headers.authorization;
    //headers['X-Hasura-Role'] = req.headers['x-hasura-role'];
    //headers['X-Hasura-Role'] = "user";
    //headers['X-Hasura-User-Id'] = user_id;
    var image_id = parseInt(req.body.image_id);
    var tag_name = req.body.tag_name;

    //var user_id =38 ;
    //console.error(req.body);
    
    var schemaFetchUrl = 'http://data.imagemanager.hasura.me/v1/query';
    var options = {
	method: 'POST',
        headers,
	body: JSON.stringify({
	    type: 'delete',     
	    args: {
	        "table":"Image_Tag",
	        "where":
		    {
			"image_id": image_id,
			"tag_name": tag_name		
		    }
	   
	    }
        })
    };

    fetch(schemaFetchUrl, options)
	.then(
	    (response) => {
	        response.text()
	            .then(
	                (data) => {
                            console.error("delete tag");
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
