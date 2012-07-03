define([
	'jquery',
	'underscore',
	'Backbone',
	'models/model'
], function ($, _, Backbone, sampleModel) {

	var sampleCollection = Backbone.Collection.extend({

		model: sampleModel,

		initialize: function () {

		}
	});

	return sampleCollection;
});