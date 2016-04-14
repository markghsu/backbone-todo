var app = app || {};

app.TodoView = Backbone.View.extend({
	tagName: "li",
	className: "todo",
	events: {
		"click .completed-box": "complete",
		"click .destroy": "destroy",
		"dblclick label": "edit",
		"keypress .editable": "changeOnEnter",
		"blur .editable": "close"
	},
	template: _.template($("#todo-template").html()),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);//custom visible event
	},
	render: function() {
		//console.log("rendering"+this.model.get('title'));
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	complete: function() {
		this.model.toggle();
	},
	destroy: function() {
		this.model.destroy({
			success: function(model, response){
				console.log("destroying model:"+response);
			},
			error: function(model, response){
				console.log("ERROR! destroying model:"+response);
			}
		})
		//this.remove(); added as listener, in case something else deletes model
	},
	changeOnEnter: function(e) {
		if(e.keyCode === 13) {
			this.close();
		}
	},
	close: function() {
		var val = this.$('.editable').val().trim();
		if(val){
			this.model.save({'title': val});
		}
		this.$el.removeClass('editing');
	},
	edit: function() {
		this.$el.addClass('editing');
		this.$('.editable').focus();
	},
	toggleVisible: function(e) {
		console.log("visible???"+this.model.get('title'));
		this.$el.toggleClass( 'hidden',  this.isHidden());
	},
	isHidden: function(e) {
		var completed = this.model.get('completed');
		if(app.filter === 'active') {
			return completed;
		}
		else if(app.filter === 'completed') {
			return !completed;
		}
		else {
			return false;
		}
	}
});