window.Store = {};

_.extend(Store, Backbone.Events);

Store.on('OPEN_DAY', function(event){
	if (event.isOpen) {
			App.businessDay.open();
		} else {
			App.businessDay.close();
		}
});

Store.on('DO_REGISTER_COMPANY', function(event){

	var company = {
		name : event.data.name
	};

	var companies = App.get('companies');

	companies.push(company);

	App.set({companies : companies});

	Store.trigger('DO_REGISTER_COMPANY:DONE', {
		data : { company : company }
	});

	Store.trigger('CHANGE_LIST_COMPANIES', {
		data : { companies: companies }
	});

	console.log('Company is register!');

});