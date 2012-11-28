var app = app || {};

// Define Backbone app
$(function( $ ) {
  // The model
  app.GoatCollection = Backbone.Collection.extend({
    url: '/goats',
  });

  app.Goat = Backbone.Model.extend({
    initialize: function(data) {
	  this.set(data);
	},

	urlRoot: '/goats',
  });
  
  // The main list view
  app.GoatListView = Backbone.View.extend({
    el: "#goat-list",

    events: {"click .delete-goat-btn": "deleteGoat"},

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

	  // Bind the render function to change events in the collection
      this.collection.bind('add remove', function() {
        self.render(self.collection);
      });
    },

    render: function (goats) {
      var self = this;
      
      // Load template for goat list and render data
      app.loadTemplate('goat-list', function(data) {
        var template = _.template(data);
        self.$el.html(template({"goats": goats.toJSON()}));
      });
    },

    deleteGoat: function (e) {
      var goat = this.collection.get($(e.target).data("id"));
      goat.destroy();
      this.collection.remove(goat);
    },
  });

  app.GoatAddView = Backbone.View.extend({
	el: "#new-goat-container",

	events: {"click #create-goat-button": "create"},

	create: function() {
	  var data = {
		"name": this.$el.find("#name-field").val(),
		"age": this.$el.find("#age-field").val(),
		"hotwater_bottles_eaten": this.$el.find("#waterbottle-field").val(),
	  }
	  var goat = new app.Goat(data);
	  goat.save(); // Should really implement success callback here to get id from server after POST
	  this.collection.add(goat);
	},
  });
  
  app.loadTemplate = function(name, success){
    $.get('js/templates/' + name + '.html', success);
  };
});

// Initialize model, fetch template and start app
$(function() {
  var goatCollection = new app.GoatCollection();
  var goatListView = new app.GoatListView({"collection": goatCollection});
  var goatAddView = new app.GoatAddView({"collection": goatCollection});
});
