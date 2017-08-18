
var BussinessDay = Backbone.Model.extend({

	intervalId : 0,

	initialize : function (){
	}

	open : function () {
		console.log('Day is open!')
		this.intervalId = setInterval(this.work, 5000, this.get('clientsFlow'));
	}, 

	close : function () {
		console.log('Day is close!');
		clearInterval(this.intervalId);
	},

	work : function (clientsFlow) {
		var count = clientsFlow.get('count');
		if (count) {
			count--;
			clientsFlow.set({count: count});
			console.log(clientsFlow.get('count'));	
		}
	}

});

var ClientsFlow = Backbone.Model.extend({
	count : 0,
});

var ButtonModel = Backbone.Model.extend({

});

var ButtonSwitch = Backbone.View.extend({

	events : {
		'click' : function () {
			this.model.set({
				isOpen : !this.model.get('isOpen')
			})
		}
	},

	initialize : function () {
		console.log('initialize');
		this.model.on('change', this.render)
	},

	render : function (){

	}

});

$(function(){

	var runButtonModel = new ButtonModel({
	 isOpen : false
	});

	var runButton = new ButtonSwitch({
		model: runButtonModel,
		el: '#open_close_day',
	});

	var clientsFlow = new ClientsFlow({
		count: 10
	})

	var day = new BussinessDay();
	day.set({clientsFlow: clientsFlow});


});

