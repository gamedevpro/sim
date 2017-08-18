var TopPanelModel = Backbone.Model.extend({

	initialize : function () {
		console.log('TopPanelModel: initialize');
		Store.on('DO_REGISTER_COMPANY:DONE', function(event){
			console.log('Новый статус!');
			this.set({personStatus: 'предпринематель'});
		}, this)
	}

});

var TopPanel = Backbone.View.extend({

	initialize : function () {
		console.log('TopPanel: initialize');
		this.renderPersonStatus(this.model.get('personStatus'));
		this.model.on('change', this.render, this);
	},

	render : function () {
		console.log('TopPanel: render');
		this.renderPersonStatus(this.model.get('personStatus'));
	},

	renderPersonStatus : function (textStatus) {
		this.$el.find('.person-status span').html(textStatus);
	}

});

$(function(){

	var model = new TopPanelModel({
		personStatus : 'безработный'
	});

	var view = new TopPanel({
		model : model,
		el: '#top_panel'
	});

});