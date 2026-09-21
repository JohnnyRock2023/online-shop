import {useCallback, useEffect, useState} from 'react'
import {handleRequest} from "../utils/handleRequest";

const useFetching = (callback, deps = []) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    const fetchItems = useCallback(
        async () => {
            setIsLoading(true)
            const {data, error} = await handleRequest(callback)
            setResult(data)
            setError(error)
            setIsLoading(false)
    }, [...deps, callback])

    return [fetchItems, isLoading, result, setResult, error]
};

export default useFetching;