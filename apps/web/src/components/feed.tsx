import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { getPosts } from '../http/get-posts'
import { FeedCard } from './feed-card'
import { FeedSentinel } from './feed-sentinel'
import { FeedSkeleton } from './feed-skeleton'

export function Feed() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => {
            return getPosts({
                cursor: pageParam,
                limit: 10,
            })
        },
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined
        },
    })

    const posts = data.pages.flatMap((page) => page.posts)

    return (
        <>
            {posts.map((post) => (
                <FeedCard key={post.id} post={post} />
            ))}

            {isFetchingNextPage && <FeedSkeleton />}

            <FeedSentinel
                hasNextPage={hasNextPage}
                isFetching={isFetchingNextPage}
                onLoadMore={() => void fetchNextPage()}
            />
        </>
    )
}
