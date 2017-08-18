var AppModel = Backbone.Model.extend({});

var App = new AppModel({
	companies : []
});

var BussinessDay = Backbone.Model.extend({

	intervalId : 0,

	initialize : function () {
	},

	open : function () {
		console.log('Day is open!');
		var clientsFlow = this.get('clientsFlow');
		var workDay = this.work(clientsFlow, this.renderCounter);
		workDay();
		this.intervalId = setInterval(workDay, 5000);
	}, 

	close : function () {
		console.log('Day is close!');
		clearInterval(this.intervalId);
	},

	renderCounter : function (count) {
		$('#clients_counter span').html(count);
	},

	work : function (clientsFlow, renderCounter) {

		return function() {
			var count = clientsFlow.get('count');
			if (count) {
				count--;
				clientsFlow.set({count: count});			
				renderCounter(count);
			}			
		};
	},

});

var ClientsFlow = Backbone.Model.extend({
	count : 0,
});

var BottomPanelModel = Backbone.Model.extend({
});

var BottomPanel = Backbone.View.extend({

	events : {
		'click .slider' : 'open'
	},

	initialize : function () {
		console.log('BottomPanel: initialize');
		//this.model.on('change', this.render)
	},

	render : function (){

	},

	open : function () {
		Store.trigger('OPEN_DAY', {
			isOpen : !this.model.get('isOpen')
		});
	}
});

var RightPanel = Backbone.View.extend({

	render : function () {

	}, 

});


$(function(){

	var bottomPanelModel = new BottomPanelModel({
		isOpen : false
	});

	var bottomPanel = new BottomPanel({
		model: bottomPanelModel,
		el: '#bottom_panel',
	});

	var rightPanel = new RightPanel({
		el: '#right_panel'
	});

	var clientsFlow = new ClientsFlow({
		count: 10
	});

	//App.businessDay = new BussinessDay({});	
	//App.businessDay.set({clientsFlow: clientsFlow});

});



