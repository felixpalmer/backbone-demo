var app = app || {};

// Define Backbone app
$(function( $ ) {
  // The model
  app.GoatCollection = Backbone.Collection.extend({
    url: '/goats.json',
  });
  
  // The view
  app.AppView = Backbone.View.extend({
    el: "#goat-list",

    initialize: function () {
      var self = this;
      this.collection.fetch({
        success: function (collection, response) {
          self.render(response);
        }
      });
    },

    render: function (goats) {
      var content = "";
      _.each(goats, function(goat) { 
        content += "<p>" + goat.name + " is " + goat.age + "</p>";
      }); 
      this.$el.html(content);
    }
  });
});

// Initialize model, fetch template and start app
$(function() {
  var goatCollection = new app.GoatCollection();
  new app.AppView( {"collection": goatCollection});
});
