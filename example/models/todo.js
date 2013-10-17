/*global Todos DS Ember */
'use strict';

Todos.Todo = DS.Model.extend({
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean'),

	todoDidChange: function () {
		this.save();
	}.observes('isCompleted', 'title')
});
