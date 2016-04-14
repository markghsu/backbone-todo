var app = app || {};

var AppView = Backbone.View.extend({
	el: "#app",
	events: {
		'keypress #todo-input': 'addOnEnter',
		'click #checkall': 'toggleAll',
		'click #clear-completed': 'clearCompleted',
	},
	statsTemplate: _.template($('#stats-template').html()),
	initialize: function() {
		this.newTodo = this.$('#todo-input');
		this.todoList = this.$('#todo-list');
		this.checkallbox = this.$('#checkall');
		this.footer = this.$('footer');

		this.listenTo(app.Todos, 'add', this.addOne);
    	this.listenTo(app.Todos, 'reset', this.addAll);
    	this.listenTo(app.Todos, 'destroy', this.render);

		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos,'filter', this.filterAll);//fired by router
		this.listenTo(app.Todos, 'all', this.render);

    	app.Todos.fetch();
	},
	addOne: function(todo) {
		//console.log('firing addOne');
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append( view.render().el );
	},
	addAll: function() {
		$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},
	addOnEnter: function(e){
		if(e.keyCode === 13) {
			//console.log("adding new todo!"+ String(this));
			app.Todos.create(new app.Todo({
				title:$('#todo-input').val(),
				order: app.Todos.nextOrder(),
				completed: false
			}));
			$('#todo-input').val("");
		}
	},
	toggleAll: function(e) {
		var completed = this.checkallbox[0].checked;
		app.Todos.each(function( todo ) {
			todo.save({
				completed: completed
			});
		});
	},
	clearCompleted: function(e) {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},
	filterOne: function(todo) {
		todo.trigger('visible');
	},
	filterAll: function() {
		app.Todos.each(this.filterOne);	
	},
	render: function() {
		//show all
		//console.log("rendering appview");
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;
		this.checkallbox.prop('checked', (completed == app.Todos.length) && (completed > 0));
		if ( app.Todos.length ) {
			//this.$main.show();
			this.footer.show();

			this.footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
		}
		else {
			this.footer.hide();
		}
	}
});