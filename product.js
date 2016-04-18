module.exports = function (productId, server) {
	return {
		id: productId,
		get: () => server.getAsync("/search/storefront/" + productId)
	};
};
