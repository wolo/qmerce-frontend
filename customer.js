module.exports = function (customerId, server) {
	const customerUrl = "/customer/"+customerId;
	
	return {
		id: customerId,
		get: () => server.getAsync(customerUrl),
//		createCart: server.postAsync("/cart/customer/" + customerId, null).then(newCart),
		update: (data) => server.postAsync(customerUrl, data),
		getAddresses: () => server.getAsync(customerUrl + "/address"),
		getBillingAddress: () => {
			return server.getAsync(customerUrl + "/address")
			.then((data) => {
				const billingAddressID = data.billingAddressID;
				return data.addresses.find((address) => address.id === billingAddressID);
			});
		},
		getShippingAddress: () => {
			return server.getAsync(customerUrl + "/address")
			.then((data) => {
				const shippingAddressID = data.shippingAddressID;
				return data.addresses.find((address) => address.id === shippingAddressID);
			});
		}
	};
};
