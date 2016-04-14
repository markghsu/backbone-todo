var app = app || {};

var Workspace = Backbone.Router.extend({
	routes: {
		"*filter": "filter"
	},
	filter: function(filt) {
		if(filt){
			filt = filt.trim();
		}
		app.filter = filt || "";
		app.Todos.trigger('filter');
	}
});

app.Router = new Workspace();
Backbone.history.start();