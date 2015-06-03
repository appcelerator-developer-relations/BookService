var Arrow = require('arrow');

var Book = Arrow.Model.extend('book',{
	fields: {
		'title': {type:String},
		'author': {type:String}
	},
	connector: 'appc.mongo'
});

module.exports = Book;
