
export async function handleRequest(request) {
    try {
        const response = await request();
        return {data: response?.data?.data, error: null};
    }
    catch (err) {
        console.log(err);
        const message = err || "Something went wrong";
        return {data: null, error: message}
    }
}