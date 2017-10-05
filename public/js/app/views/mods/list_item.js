define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone'),
      Marionette          = require('marionette'),
      Ladda               = require('ladda'),
      swal                = require('sweet-alert'),
      tpl                 = require('text!tpl/mods/list_item.html'),

      template = _.template(tpl);

  return Marionette.ItemView.extend({
    tagName: "tr",
    template: template,

    events: {
      "click .destroy": "deleteMod",
      "click .update": "updateMod",
    },

    deleteMod: function (event) {
      var self = this;
      sweetAlert({
        title: "Are you sure?",
        text: "The mod will be deleted from the server!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
      },
      function(){
        self.model.destroy();
      });
    },

    updateMod: function (event) {
      var self = this;
      event.preventDefault();

      var $updateBtn = this.$el.find(".update");
      var laddaBtn = Ladda.create($updateBtn.get(0));
      laddaBtn.start();

      $.ajax({
        url: "/api/mods/" + this.model.get('name'),
        type: 'PUT',
        success: function (resp) {
          laddaBtn.stop();
        },
        error: function (resp) {
          laddaBtn.stop();
        },
      });
    },
  });
});
