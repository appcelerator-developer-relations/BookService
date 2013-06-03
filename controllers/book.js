var mongodb = require('mongodb');
var BASE_URL = MONGOHQ_URL;

function bookCreate(req, res) {
	if (!req.body.title || !req.body.author) {
		res.status(400).send({error: 'Invalid input. Missing title or author.'});
		return;
	}
	mongodb.Db.connect(BASE_URL, function(connect_error,client) {
		if (connect_error) logError(res, connect_error);
		client.collection('book', function(collection_error, collection ){
			if(collection_error) logError(res, collection_error);
				collection.save({title: req.body.title, author: req.body.author}, function(save_error, result) {
				if (save_error) {
					logError(res, save_error);
				} else {
					res.status(201).send(result);
				}
			});
		});
	});
}

function bookRead(req, res) {
	mongodb.Db.connect(BASE_URL, function(connect_error,client) {
	if (connect_error) logError(res, connect_error);
		client.collection('book', function(collection_error, collection) {
			if(collection_error) logError(res, collection_error);
			var id = getObjectID(res, req.params.id);
			collection.findOne({_id: id}, function(find_error, doc) {
				if (find_error) { 
					logError(res, find_error);
				} else {
					if (doc) {
						res.send(doc);
					}
					else {
						res.status(404).send({error: 'Document not found.'});
					}
				}
			});
		});
	});
}

function bookReadAll(req, res) {
	mongodb.Db.connect(BASE_URL, function(connect_error,client) {
	if (connect_error) logError(res, connect_error);
		client.collection('book', function(collection_error, collection) {
			if(collection_error) logError(res, collection_error);
			collection.find({}).toArray(function(find_error, docs) {
				if (find_error) { 
					logError(res, find_error);
				} else {	
					res.send(docs);
				}
			});
		});
	});
}

function bookUpdate(req, res) {
	if (!req.body.title || !req.body.author) {
		res.status(400).send({error: 'Invalid input. Missing title or author.'});
		return;
	}
	mongodb.Db.connect(BASE_URL, function(error, client) {
		if (error) logError(res, error);	
		client.collection('book', function(collection_error, collection) {
			if(collection_error) logError(res, collection_error);
			var id = getObjectID(res, req.params.id);
			collection.update({_id: id}, {title: req.body.title, author: req.body.author}, function(update_error, result) {
				if (update_error) {
					logError(res, update_error);
				} else {
					if (result) {
						collection.findOne({_id: id}, function(find_error, doc) {
						    res.send(doc);
						});
					} else {
						res.status(404).send({error: 'Document not found.'});
					}
				}
			});
		});
	});
}

function bookDelete(req, res) {
	mongodb.Db.connect(BASE_URL, function(error,client) {
		if (error) logError(res, error);
		client.collection('book', function(collection_error, collection) {
			if(collection_error) logError(res, collection_error);
			var id = getObjectID(res, req.params.id);
			collection.findOne({_id: id}, function(find_error, doc) {
				if (find_error) logError(res, find_error);
				if (!doc) {
					res.status(404).send({error: 'Document not found.'});
					return;
				}
				collection.remove({_id: id}, function(remove_error, foobar) {
					if (remove_error) {
						logError(res, remove_error);
					} else {
						res.send(doc);
					}
				});
			});
		});
	});
}

function logError(res, err) {
	res.status(500).send({error: 'Unexpected Error: ' + err});
	throw err;
}

function getObjectID (res, id_str) {
	try {
		var id = new mongodb.ObjectID(id_str);
		return id;
	}
	catch (err) {
		res.status(400).send({error: 'Invalid ID'});
		throw err;
	}
}
