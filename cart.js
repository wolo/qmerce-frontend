const Order = require("./order.js");

module.exports = function (cartId, server) {
	const cartUrl = "/cart/"+cartId;
	
	const _getPaymentMethods = () => server.getAsync(cartUrl+"/paymentMethods").then((data) => {
//		console.log("payment methods");
//		console.log(data);
		return data.paymentMethods;
	});
	const _addPayment = (paymentMethodId) => server.postAsync(cartUrl+"/payment", {"id" : paymentMethodId});
	const _addShipment = (shippingMethodId, shippingAddress) => server.postAsync("/shipment", {
		"cartId" : cartId,
		"shippingMethodId": shippingMethodId,
		"cartAddress": shippingAddress
	});
	
	return {
		id: cartId,
		get: () => server.getAsync(cartUrl),

		addItem: (data) => server.postAsync(cartUrl+"/items", data),
		updateItem: (position, data) => server.postAsync(cartUrl+"/items/"+position, data),
		deleteItem: (position) => server.deleteAsync(cartUrl+"/items/"+position),

		setBillingAddress: (data) => server.postAsync(cartUrl+"/billing/address", data),

		addShipment: _addShipment,
		deleteShipment: (shipmentId) => server.deleteAsync("/shipment/"+shipmentId),

		addPayment: _addPayment,
		deletePayment: (paymentId) => server.deleteAsync(cartUrl+"/payment/" + paymentId),
		getPaymentMethods: () => _getPaymentMethods,

		createOrder: () => server.postAsync("/order", {"cartId" : cartId}).then((location) => {
			const parts = location.split("/");
			const orderId = parts[parts.length-1];
			console.log("created order:", orderId);
			return new Order(orderId, server);
		}),
		
		/*
		 * extended methods
		 */
		
		addAnyShipment: (address) => {
			return server.getAsync("/shipment")
			.then((data) => data.shippingMethods)
			.then((shippingMethods) => {
//				console.log(shippingMethods);
				const shippingMethodId = shippingMethods[0].id;
				console.log("set shipment " + shippingMethodId);
				return _addShipment(shippingMethodId, address);
			});
		},
		addAnyPayment: () => {
			return _getPaymentMethods()
			.then((paymentMethods) => {
				const paymentMethodId = paymentMethods[0].id;
				console.log("set payment " + paymentMethodId);
				return _addPayment(paymentMethodId);
			});
		}
	};
};
