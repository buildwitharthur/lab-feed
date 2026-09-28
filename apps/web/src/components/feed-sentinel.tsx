import { useEffect, useRef } from 'react'

type FeedSentinelProps = {
    hasNextPage: boolean
    isFetching: boolean
    onLoadMore: () => void
}

export function FeedSentinel({
    hasNextPage,
    isFetching,
    onLoadMore,
}: FeedSentinelProps) {
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sentinel = sentinelRef.current

        if (!sentinel || !hasNextPage) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetching) {
                    onLoadMore()
                }
            },
            {
                rootMargin: '300px',
            },
        )

        observer.observe(sentinel)

        return () => {
            observer.disconnect()
        }
    }, [hasNextPage, isFetching, onLoadMore])

    if (!hasNextPage) {
        return null
    }

    return <div ref={sentinelRef} className="h-px" aria-hidden="true" />
}
