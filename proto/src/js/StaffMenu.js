var StaffMenuModel = Backbone.Model.extend({

	initialize : function () {
		console.log('StaffMenuModel: initialize');
		Store.on('CHANGE_LIST_COMPANIES', function(event){
			var hireEmployee = this.get('hireEmployee');
			if (event.data.companies.length) {
				hireEmployee.enabled = true;
				this.set({isVisible: true, hireEmployee: hireEmployee});
			} else {
				hireEmployee.enabled = false;
				this.set({isVisible: false, hireEmployee: hireEmployee});
			}
		}, this);
	},

});


var StaffMenu = Backbone.View.extend({

	initialize : function () {
		console.log('StaffMenu: initialize');
		this.render();
		this.model.on('change', this.render, this);
	},

	render : function () {
		if (this.model.get('isVisible')) {
			this.$el.show();
		} else {
			this.$el.hide();
		}
		this.renderHireEmployee();
	},

	renderHireEmployee : function () {
		var hireEmployee = this.model.get('hireEmployee');
		var $btnHire = this.$el.find('.btn-hire-employee');
		if (hireEmployee.enabled) {
			$btnHire.removeClass('disabled');
		} else { 
			$btnHire.addClass('disabled');
		}
	}

});

$(function(){

	var model = new StaffMenuModel({
		isVisible : false,
		hireEmployee : {
			enabled : false
		}
	});

	var view = new StaffMenu({
		model: model,
		el: '#staff_menu'
	});

});