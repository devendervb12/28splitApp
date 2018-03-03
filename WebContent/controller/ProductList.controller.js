sap.ui.controller("smax.batch28.SA.controller.ProductList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductList
*/
//	onInit: function() {
//
//	},

	onItemSelection : function(oEvent){
		var productID = oEvent.getSource().getTitle();
		
		this.getOwnerComponent().getRouter().navTo("toDetails", {prodId : productID});
		
	}

});