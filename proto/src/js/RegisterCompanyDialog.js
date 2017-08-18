var RegisterCompanyDialogModel = Backbone.Model.extend({

	initialize : function () {
		Store.on('DO_REGISTER_COMPANY:DONE', this.complete, this);
	}, 

	complete : function (event) {
		this.set({done: true});
	}

});

var RegisterCompanyDialog = Backbone.View.extend({

	events : {
		'click .btn-register' : 'register'
	},

	initialize : function () {
		this.model.on('change', this.render);
	},

	render : function () {
		console.log('RegisterCompanyDialog: render');
	}, 

	register : function () {
		Store.trigger('DO_REGISTER_COMPANY', {
			data : { name : 'Test' }
		});
	}

});

$(function(){

	var model = new RegisterCompanyDialogModel({
		done: false
	});

	var view = new RegisterCompanyDialog({
		model: model,
		el: '#register_company'
	});

});