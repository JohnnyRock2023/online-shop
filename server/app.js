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
app.use('/items', itemsRouter)
app.use('/cart', cartRouter)
app.use('/comments', commentsRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/uploads', express.static('./uploads'))

const port = process.env.PORT || 5000
app.listen(port, () => {console.log(`Server started on port ${port}`)})