var app = app || {};

var TodoList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	completed: function() {
		//return list of everything that is completed
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},
	remaining: function() {
		//return list of everything that is not completed
		return this.without.apply(this, this.completed());
	},
	nextOrder: function () {
		if(this.length == 0){
			return 1;
		}
		return this.last().get('order') + 1;
	},
	comparator: function( todo ) {
    	return todo.get('order');
	}
});

app.Todos = new TodoList();