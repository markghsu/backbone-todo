var app = app || {};

app.Todo = Backbone.Model.extend({
	initialize: function(){

	},
	defaults: {
		completed: false,
		title: ""
	},
	validate: function(attributes) {
		if(attributes.title === "") {
			return "Remember to fill in your title!";
		}
	},
	toggle: function() {
		this.save({completed: !this.get('completed')});
		console.log("complete toggled, now: " + String(this.get('completed')));
	}
});