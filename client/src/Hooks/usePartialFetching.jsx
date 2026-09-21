import useFetching from "./useFetching";
import {useEffect, useState} from "react";

const usePartialFetching = (fetch, loaderRef, deps = [], preventFetch = false) => {
    const [fullResult, setFullResult] = useState([]);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [ready, setReady] = useState(0);

    const [fetchData, isLoading, result, setResult, error] = useFetching(async () => {
        const res = await fetch(page, cursor)
        setCursor(res.data.meta.nextCursor)
        setHasMore(res.data.meta.totalPages > page)
        setFullResult(prev => [...prev, ...res?.data.data])
        return res
    }, [fetch, ready]);

    useEffect(() => {
        if (preventFetch) return;
        setHasMore(false)
        setFullResult([])
        setCursor(null)
        setPage(1)
        setReady(prev => prev + 1)
    }, deps)

    useEffect(() => {
        if (ready === 0) return;
        fetchData()
    }, [ready]);

    useEffect(() => {
        const observer = new IntersectionObserver( observed =>
            {
                if (observed[0].isIntersecting && !isLoading && hasMore) {
                    setPage(prev => prev + 1)
                    setReady(prev => prev + 1)
                    console.log('ddx')
                }
            }, {threshold: 0.1}
        )

        if (loaderRef?.current) {
            observer.observe(loaderRef?.current);
        }
        return () => {observer.disconnect()};

    }, [hasMore]);
    return [isLoading, fullResult, setFullResult, hasMore, error]
}

export default usePartialFetching;