
export async function handleRequest(request) {
    try {
        const response = await request();
        return {data: response?.data?.data, error: null};
    }
    catch (err) {
        const message = err?.response?.data?.message || "Something went wrong";
        return {data: null, error: message}
    }
}