var todoList = {
	items: [],
	categories: ['default'],


	// Store data in local storage for later retrieval
	storeData: function() {
		localStorage.setItem('myTodoListItems', JSON.stringify(this.items));
		localStorage.setItem('myTodoListCategories', JSON.stringify(this.categories));
	},
	
	// Get data from local storage
	getData: function() {
		this.items = JSON.parse(localStorage.getItem('myTodoListItems'));
		this.categories = JSON.parse(localStorage.getItem('myTodoListCategories'));

		if (this.items === null) {
			this.items = [];
		}

		if (this.categories === null) {
			this.categories = ['default'];
		}
	},

	addItem: function(item) {
		//All arguments after 'item' parameter set categories for item added
		var itemCategories = ['default'];
		for (i = 1; i < arguments.length; i++) {
			itemCategories.push(arguments[i]);
		}

		//Push item into todoList.items
		this.items.push({
			val: item,
			categories: itemCategories
		});

		//Add new categories to todoList.categories if necessary
		for (i in itemCategories) {
			if (this.categories.indexOf(itemCategories[i]) == -1) {
				this.categories.push(itemCategories[i]);
			}
		}

		// Store data in local storage
		this.storeData();
	},

	deleteItem: function(item) {
		for (i in this.items) {
			if (this.items[i].val == item) {
				this.items.splice(i,1);
			}
		}

		// Store data in local storage
		this.storeData();
	},

	changeItem: function(oldVal, newVal) {
		for (i in this.items) {
			if (this.items[i].val == oldVal) {
				this.items[i].val = newVal;
			}
		}

		// Store data in local storage
		this.storeData();
	},

	setCategory: function(item) {
		for (i = 1; i < arguments.length; i++) { //Go through each argument
			for (j in this.items) { //Go through each item in todoList
				if (this.items[j].val == item) { //If item has a match, set category for it to chosen args
					if (this.items[j].categories.indexOf(arguments[i]) != -1) {
						console.log("Selected item already has category: " + arguments[i]);
					}
					else {
						this.items[j].categories.push(arguments[i]);
					}
				}
			}

			if (this.categories.indexOf(arguments[i]) == -1) { //Create category if it doesn't exist
				this.categories.push(arguments[i]);
			}
		}

		// Store data in local storage
		this.storeData();
	},

	showList: function() {
		for (i in this.items) {
			console.log("- " + this.items[i].val);
		}
	},

	showListByCategory: function() {
		for (i in this.categories) { //Go through categories
			console.log('===== ' + this.categories[i].toUpperCase() + ' ====='); //Print category heading-style
			for (j in this.items) { //Search items for matching category
				if (this.items[j].categories.indexOf(this.categories[i]) != -1) {
					console.log('- ' + this.items[j].val);
				}
			}
		}
	}
};

// Initialise todoList data with local storage data
todoList.getData();