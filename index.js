// code away!
const express = require('express')
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')
const logger = require('./middleware/logger')
const app = express()

app.use(express.json())
app.use(logger)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

const port = 8000
app.listen(port, () => {
    console.log(`*** Server is running on http://localhost:${port} ***`)
})
