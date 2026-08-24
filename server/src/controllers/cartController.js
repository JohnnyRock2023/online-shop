const {query} = require('../db/db.js')
const authController = require('./authContoller.js')

exports.getCart = async (req, res) => {
    const data = authController.decodeToken(req)
    const result = await query('SELECT Cart.item_id::bigint as id, Cart.count, Item.name, Item.price, Item.image  FROM public."Cart" Cart JOIN public."Items" Item ON Cart.item_id = Item.id WHERE Cart.user_id = $1',
        [data.user_id])
    return res.status(200).json({data: result.rows, message: 'Cart got successfully'})
}

exports.delFromCart = async (req, res) => {
    const data = authController.decodeToken(req)
    await query('DELETE FROM public."Cart" WHERE user_id = $1 AND item_id = $2', [data.user_id, req.params.id])
    return res.status(204).json({message: 'Item deleted successfully'})
}