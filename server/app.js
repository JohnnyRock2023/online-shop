const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const itemsRouter = require('./src/routes/items.js');
const cartRouter = require('./src/routes/cart.js');
const commentsRouter = require('./src/routes/comments.js');
const authRouter = require("./src/routes/auth.js");
const userRouter = require("./src/routes/user.js");

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/items', itemsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/uploads', express.static('./uploads'))

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({message: "Internal Server Error"});
})

const port = process.env.PORT || 5000
app.listen(port, () => {console.log(`Server started on port ${port}`)})