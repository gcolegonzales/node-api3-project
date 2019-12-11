function logger(req, res, next) {
    const startTime = Date.now()
    req.startTime = startTime
    console.log(`Method: ${req.method} | URL: ${req.url} | Started: ${startTime}`)
    next()
}

module.exports = logger