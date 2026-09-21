const {processPayment} = require("../services/paymentService");
const {connect} = require("../db/db");

exports.processPayment = async (req, res) => {
    const result = await processPayment()
    if (result.success) {
        const client = await connect();
        try {
            await client.query('BEGIN');
            const {rows: paymentData} = await client.query(`SELECT order_id FROM "Payment" WHERE id = $1`, [req.params.id]);
            await client.query(`UPDATE public."Payment" SET status = 'paid', transaction_id = $1 WHERE id = $2`, [result.transactionId, req.params.id]);
            await client.query(`UPDATE public."Order" SET status = 'paid' WHERE id = $1`, [paymentData[0].order_id]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
    return res.status(201).json({data: result, message: "Payment was successfully processed"})
}