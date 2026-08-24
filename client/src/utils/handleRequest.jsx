
export async function handleRequest(request) {
    try {
        const response = await request();
        return {data: response?.data, error: null};
    }
    catch (err) {
        console.log(err);
        const message = err.response?.data?.data?.error?.message || "Something went wrong";
        return {data: null, error: message}
    }
}