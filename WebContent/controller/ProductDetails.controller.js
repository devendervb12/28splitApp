sap.ui.controller("smax.batch28.SA.controller.ProductDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductDetails
*/
	onInit: function() {
        
		var oRouter = this.getOwnerComponent().getRouter();
		
		oRouter.getRoute("toDetails").attachPatternMatched(function(oEvent){
			
			var productId = oEvent.getParameters().arguments.prodId;
			
			this.getView().bindElement("/ProductSet('"+productId+"')");
			
		},this);
	},
	onCreate : function(){
		//create the data
		var oDialog = new sap.m.Dialog({
			title : "Create Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Supplier ID"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({ text : "Save and Close", press : function(){
					// add data to model odatamodel
					var data = {
							ProductID : oDialog.getContent()[1].getValue(),
							Name :  oDialog.getContent()[3].getValue(),
							Category :  oDialog.getContent()[5].getValue(),
							SupplierID :  oDialog.getContent()[7].getValue(),
							
					}
					var oModel = oDialog.getModel();
					
					oModel.create("/ProductSet", data, {
						success : function(){
							sap.m.MessageToast.show("Data created");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not created");
						}
					})
					
					oDialog.close();
				}})
				
			]
		});
		oDialog.setModel(this.getOwnerComponent().getModel());
		oDialog.open();
		
	},
	onUpdate : function(){
	   	var oController = this;
	
		var oDialog = new sap.m.Dialog({
			title : "Update Name of the Product",
			content : [
				new sap.m.Label({text : "Product ID"}),
				new sap.m.Input({editable : false, value : oController.getView().byId("idobjHeader").getNumber()}),
				new sap.m.Label({text : "Name"}),
				new sap.m.Input({value : oController.getView().byId("idobjHeader").getTitle()}),
				new sap.m.Label({text : "Category"}),
				new sap.m.Input({editable : false, value : oController.getView().byId("idobjAttr").getText()}),
				new sap.m.Label({text : "Supplier ID"}),
				new sap.m.Input({editable : false, value : oController.getView().byId("idobjAttr2").getText()}),			
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close", press : function(){
					
					var data = {
							Name : oDialog.getContent()[3].getValue()
					}
					var oModel = oDialog.getModel();
					oModel.update("/ProductSet('"+oController.getView().byId("idobjHeader").getNumber()+"')",
					 data,
					 {
						success : function(){
							sap.m.MessageToast.show("Data Updated");
						},
						error : function(){
							sap.m.MessageToast.show("Data not Updated");
						}
					 }
					)
					oDialog.close();
				}})
				
			]
		});
		oDialog.setModel(this.getOwnerComponent().getModel());
		oDialog.open();
		
		}

});