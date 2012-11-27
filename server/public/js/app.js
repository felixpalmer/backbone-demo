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
      this.collection.fetch({
        success: function (collection, response) {
          console.log(response);
        }
      });
    },
  });
});

// Initialize model, fetch template and start app
$(function() {
  var goatCollection = new app.GoatCollection();
  new app.AppView( {"collection": goatCollection});
});
