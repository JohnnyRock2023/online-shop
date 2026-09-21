
exports.processPayment = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {success: true, transactionId: crypto.randomUUID()}
}

