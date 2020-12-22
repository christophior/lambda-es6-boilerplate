const middy = require("@middy/core")

const httpJsonBodyParser = require("@middy/http-json-body-parser")
const httpResponseSerializer = require("@middy/http-response-serializer")
const cors = require("@middy/http-cors")
const httpSecurityHeaders = require("@middy/http-security-headers")

module.exports.apiMiddleware = (handler) => {
	const middyHandler = middy(handler)

	middyHandler
		.use(httpJsonBodyParser())
		.use(cors())
		.use(httpSecurityHeaders())
		.use(
			httpResponseSerializer({
				serializers: [
					{
						regex: /^application\/json$/,
						serializer: ({ body }) =>
							typeof body !== "string" ? JSON.stringify(body) : body,
					},
					{
						regex: /^text\/plain$/,
						serializer: ({ body }) => body,
					},
				],
				default: "application/json",
			})
		)

	return middyHandler
}

module.exports.lambdaMiddleware = (handler) => {
	const middyHandler = middy(handler)

	middyHandler.use(httpJsonBodyParser()).use(cors()).use(httpSecurityHeaders())

	return middyHandler
}
