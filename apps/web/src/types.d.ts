type FeedAuthor = {
    id: number
    name: string
    username: string
    avatarUrl: string | null
}

type FeedPost = {
    id: number
    content: string
    code: string | null
    tags: string[]
    commentsCount: number
    repostsCount: number
    likesCount: number
    createdAt: string
    author: FeedAuthor
}

type GetPostsResponse = {
    posts: FeedPost[]
    nextCursor: number | null
    hasMore: boolean
}
