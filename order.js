module.exports = function (orderId, server) {
	const orderUrl = "/order/"+orderId;
	return {
		id: orderId,
		get: () => server.getAsync(orderUrl, callback),
		abort: () => server.postAsync(orderUrl+"/status", {"newStatus" : "ABORT"}),
		finalize: () => server.postAsync(orderUrl+"/status", {"newStatus" : "FINALIZE"})
	};
};
