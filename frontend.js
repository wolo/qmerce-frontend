const JsonRestApi = require("qmerce-rest");
const Cart = require("./cart.js");
const Customer = require("./customer.js");
const Order = require("./order.js");
const Product = require("./product.js");

module.exports = function(apiUrl, basicAuth) {
	const server = JsonRestApi(apiUrl, basicAuth);
	
	const lastUrlPart = (url) => {
		const parts = url.split("/");
		return parts[parts.length-1];
	}

	const newCart = (cartUrl)  => {
		const cartId = lastUrlPart(cartUrl);
		return new Cart(cartId, server);
	};

	const newCustomer = (customerUrl)  => {
		const customerId = lastUrlPart(customerUrl);
		return new Customer(customerId, server);
	};

	return {
		createCart: (customerId) => server.postAsync(customerId === undefined ? "/cart" : "/cart/customer/" + customerId, null).then(newCart),
		cart: (id) => new Cart(id, server),
		customer: (id) => new Customer(id, server),
		order: (id) => new Order(id, server),
		product: (id) => new Product(id, server),
		getAllShippingMethods: () => server.getAsync("/shipment").then((data) => data.shippingMethods),
		validateCartAddress: (address) => server.postAsync("/validate/cartAddress", address),
		validateCustomerAddress: (address) => server.postAsync("/validate/customerAddress", address),
		completeAddress: (address) => server.postAsync("/service/addressCompletion", address),
		
		createCustomer: (data) => server.postAsync("/customer", data).then(newCustomer)
	}
};
