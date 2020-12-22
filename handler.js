const { lambdaMiddleware } = require("./utils/middleware")

module.exports.example = lambdaMiddleware((event, context, callback) => {
	callback(null, {
		statusCode: 200,
		body: {
			message: "Success!",
		},
	})
})
