# beware this won't work if you have a bodyParser in your middleware!
# let me know if you'd like the later technique
orchestrateIoProxy = ->
  httpProxy = require("http-proxy")
  proxy = new httpProxy.RoutingProxy()
  Buffer = require("buffer").Buffer
  (req, res, next) ->
    if req.url.indexOf("/v0/") is 0
      userPass = new Buffer("30132a35-c23c-490b-a081-b9110733e993", "ascii")
      userPass = userPass.toString("base64")
      req.headers.authorization = "Basic " + userPass
      proxy.proxyRequest req, res,
        host: "api.orchestrate.io"
        port: 80
    else
      next()

middleware = (connect, options)->
  [
    connect.static(options.base),
    # connect.directory(options.base),
    orchestrateIoProxy()
  ]

module.exports = 
  connect:
    server:
      options:
        port: process.env.port or 8000
        hostname: "0.0.0.0"
        # base: "/"
        middleware: middleware
