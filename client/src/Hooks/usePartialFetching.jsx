import useFetching from "./useFetching";
import {useEffect, useRef, useState} from "react";

const usePartialFetching = (fetch, loaderRef, watch = null) => {

    const [fullResult, setFullResult] = useState([]);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false);
    const [cursor, setCursor] = useState(null);

    const [fetchData, isLoading, result, setResult, error] = useFetching(async () => {
            const res = await fetch(page, cursor)
            setCursor(res.data.meta.nextCursor)
            setHasMore(res.data.meta.totalPages > page)
            setFullResult(prev => [...prev, ...res?.data.data])
            return res
    });

    useEffect(() => {
        setHasMore(false)
        setFullResult([])
        setCursor(null)
        setPage(1)
    }, [watch])

    useEffect(() => {
        if (watch?.length === 0) return;
        fetchData()
    }, [watch, page]);

    useEffect(() => {
        const observer = new IntersectionObserver( observed =>
            {
                if (observed[0].isIntersecting && !isLoading && hasMore) {
                    setPage(prev => prev + 1)
                }
            }, {threshold: 0.1}
        )

        if (loaderRef?.current) {
            observer.observe(loaderRef?.current);
        }
        return () => {observer.disconnect()};

    }, [watch, cursor, hasMore, isLoading]);
    return [isLoading, fullResult, setFullResult, hasMore, error]
}

export default usePartialFetching;