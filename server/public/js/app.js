var app = app || {};

// Define Backbone app
$(function( $ ) {
  // The model
  app.GoatCollection = Backbone.Collection.extend({
    url: '/goats.json',
  });

  app.Goat = Backbone.Model.extend({
    initialize: function(data) {
	  this.set(data);
	},

	urlRoot: '/goats',
  });
  
  // The view
  app.AppView = Backbone.View.extend({
    el: "#goat-list",

    initialize: function () {
      var self = this;
      this.collection.fetch({
        success: function (collection, response) {
		  _.each(response, function(data) {
			 console.log(data);
			var goat = new app.Goat(data);
		  	self.collection.add(goat);
		  });
          self.render(self.collection);
        }
      });
    },

    render: function (goats) {
      var self = this;
      
      // Load template for goat list and render data
      app.loadTemplate('goat-list', function(data) {
        var template = _.template(data);
        self.$el.html(template({"goats": goats.toJSON()}));
      });
    }
  });
  
  app.loadTemplate = function(name, success){
    $.get('js/templates/' + name + '.html', success);
  };
});

// Initialize model, fetch template and start app
$(function() {
  var goatCollection = new app.GoatCollection();
  var appView = new app.AppView({"collection": goatCollection});
});
