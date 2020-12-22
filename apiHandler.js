const { apiMiddleware } = require("./utils/middleware")

const getExample = apiMiddleware((event, context, callback) => {
	callback(null, {
		statusCode: 200,
		body: {
			message: "received!",
		},
	})
})

const postExample = apiMiddleware((event, context, callback) => {
	callback(null, {
		statusCode: 200,
		body: { ...event.body, hello: "world!" },
	})
})

module.exports = {
	getExample,
	postExample,
}
