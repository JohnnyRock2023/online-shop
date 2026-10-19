const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const productRouter = require('./src/routes/product.js');
const cartRouter = require('./src/routes/cart.js');
const commentsRouter = require('./src/routes/comments.js');
const authRouter = require("./src/routes/auth.js");
const userRouter = require("./src/routes/user.js");
const orderRouter = require("./src/routes/order.js");
const paymentRouter = require("./src/routes/payment.js");
const favoritesRouter = require("./src/routes/favorites.js");

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/auth', authRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/user', userRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/uploads', express.static('./uploads'))

app.use((err, req, res, next) => {
    process.env.DEBUG && console.log(err)
    res.status(500).json({message: "Internal Server Error"});
})

const port = process.env.PORT || 5000
app.listen(port, () => {console.log(`Server started on port ${port}`)})