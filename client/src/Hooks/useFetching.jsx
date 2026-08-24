import {useState} from 'react'
import {handleRequest} from "../utils/handleRequest";

const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const fetchItems = async () => {
            setIsLoading(true)
            const {data, error} = await handleRequest(callback)
            setResult(data)
            setError(error)
            setIsLoading(false)
    }
    return [fetchItems, isLoading, result, error]
};

export default useFetching;