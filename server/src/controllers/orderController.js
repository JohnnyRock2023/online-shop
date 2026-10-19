const {query, connect} = require("../db/db");
const {decodeToken} = require("./authContoller");
const {particalFetching} = require("../utils/particalFetching");

exports.getOrders = async (req, res) => {
    const token = decodeToken(req, res)
    const filter = req?.query?.filter && req.query?.filter !== 'all' ? `status = '${req.query?.filter}'`: ``
    const cursor = req?.query?.cursor ? `id < ${req.query.cursor}`: ""
    const total = await query(`SELECT COUNT(*) from public."Order" o WHERE o.user_id = $1 ${filter ? 'AND': ''} ${filter}`, [token.user_id])
    const getQuery = `SELECT o.id order_id, o.status, o.created_at date, oi.price_at_purchase price, oi.quantity, i.image, i.name
                                        FROM (
                                            SELECT *
                                            FROM public."Order"
                                            ${filter || cursor ? 'WHERE': ''}
                                            ${filter}
                                            ${filter && cursor ? 'AND': ''}
                                            ${cursor}
                                            ORDER BY id DESC
                                            LIMIT $2
                                            ) o 
                                        JOIN public."Order_item" oi 
                                        ON o.id = oi.order_id 
                                        JOIN public."Items" i 
                                        ON  i.id = oi.item_id
                                        WHERE user_id = $1
                                        ORDER BY o.id DESC`
    const result = await particalFetching(req, total, getQuery, [token.user_id],  "Got orders successfully")
    const orders = []
    for (const row of result.data) {
        let order = orders.find(o => o.orderId === row.order_id);
        if (!order) {
            order = {
                orderId: row.order_id,
                status: row.status,
                date: row.date,
                items: []
            };
            orders.push(order);
        }
        order.items.push({
            name: row.name,
            quantity: row.quantity,
            price: row.price,
            image: row.image
        });
    }
    result.data = orders;
    result.meta.nextCursor = orders.length ? orders[orders.length - 1].orderId : null
    return res.status(200).json(result)
}

exports.getOrder = async (req, res) => {
    const [id] = decodeToken(req, res)
    const {rows: order} = await query('SELECT status, created_at FROM public."Order" WHERE user_id = $1', [id])
    const {rows: items} = await query(`SELECT i.item_id, i.quantity, i.price_at_purchase FROM public."Order" o 
             JOIN public."Order_item" i ON o.id = i.order_id WHERE o.user_id = $1`, [id])
    return res.status(200).json({data: {status: order[0].status, created_at: order[0].created_at, items },
        message: "Got order successfully"})
}

exports.addOrder = async (req, res) => {
    const token = decodeToken(req, res)
    const client = await connect()

    try {
        await client.query('BEGIN')
        const {rows: res_order} = await client.query(`INSERT INTO public."Order"(user_id) VALUES ($1) RETURNING id`, [token.user_id])

        const {rows: products_price} = await client.query(`SELECT id, price 
                                                           FROM public."Items" 
                                                           WHERE id = ANY($1)`
            , [req.body.map(e => Number(e.id))])
        const params = req.body.map(e => [Number(res_order[0].id), Number(e.id), Number(e.count),
                                    Number(products_price.filter(el => Number(e.id) === Number(el.id))[0].price)])
        const values = params.map((row, rowIndex) => {
            return `(${row.map((_, columnIndex) =>
                `$${rowIndex * row.length + columnIndex + 1}`
            ).join(', ')})`;
        }).join(', ');

        await client.query(`INSERT INTO public."Order_item"(order_id, item_id, quantity, price_at_purchase)
                            VALUES ${values}`, params.flat())
        let amount = 0
        params.forEach(e => {amount += e[2] * e[3]})
        const {rows: payment} = await client.query(`INSERT INTO public."Payment"(order_id, provider, amount) 
                                                    VALUES ($1, $2, $3) RETURNING id`, [res_order[0].id, 'mock', amount])
        await client.query('COMMIT')
        return res.status(200).json({data: {order_id: res_order[0].id, payment_id: payment[0].id} , message: "Added order successfully"})
    } catch(err) {
      await client.query('ROLLBACK')
        console.log(err)
    }
    finally {
        client.release();
    }
}

exports.deleteOrder = async (req, res) => {

}
