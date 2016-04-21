module.exports = function (productAttributeId, server) {
	return {
		id: productAttributeId,
		get: () => server.getAsync("/productAttributes/" + productAttributeId)
	};
};
