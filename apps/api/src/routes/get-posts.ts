import type { RequestHandler } from 'express'
import { z } from 'zod'

import { prisma } from '../lib/prisma.js'

const getPostsQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(50).default(10),
    cursor: z.coerce.number().int().positive().optional(),
})

export const getPosts: RequestHandler = async (request, response) => {
    const result = getPostsQuerySchema.safeParse(request.query)

    if (!result.success) {
        return response.status(400).json({
            message: 'Invalid query parameters.',
        })
    }

    const { limit, cursor } = result.data

    const posts = await prisma.post.findMany({
        cursor: cursor
            ? {
                  id: cursor,
              }
            : undefined,
        skip: cursor ? 1 : 0,
        take: limit + 1,
        orderBy: {
            id: 'desc',
        },
        select: {
            id: true,
            content: true,
            code: true,
            tags: true,
            commentsCount: true,
            repostsCount: true,
            likesCount: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatarUrl: true,
                },
            },
        },
    })

    const hasMore = posts.length > limit

    if (hasMore) {
        posts.pop()
    }

    const lastPost = posts.at(-1)

    return response.status(200).json({
        posts,
        nextCursor: hasMore && lastPost ? lastPost.id : null,
        hasMore,
    })
}
