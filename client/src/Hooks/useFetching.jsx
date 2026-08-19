import {useState} from 'react'

const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const fetchItems = async () => {
        try {
            setIsLoading(true)
            await callback()
        }
        catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetchItems, isLoading, error]
};

export default useFetching;