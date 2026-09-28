import type { RequestHandler } from 'express'

import { prisma } from '../lib/prisma.js'

export const getPosts: RequestHandler = async (request, response) => {
    const rawLimit = request.query.limit

    if (rawLimit !== undefined && typeof rawLimit !== 'string') {
        return response.status(400).json({
            message: 'Invalid limit.',
        })
    }

    const limit = rawLimit === undefined ? 10 : Number(rawLimit)

    if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
        return response.status(400).json({
            message: 'Invalid limit.',
        })
    }

    const rawCursor = request.query.cursor

    if (rawCursor !== undefined && typeof rawCursor !== 'string') {
        return response.status(400).json({
            message: 'Invalid cursor.',
        })
    }

    const cursor = rawCursor === undefined ? undefined : Number(rawCursor)

    if (cursor !== undefined && (!Number.isInteger(cursor) || cursor <= 0)) {
        return response.status(400).json({
            message: 'Invalid cursor.',
        })
    }

    const posts = await prisma.post.findMany({
        where: cursor
            ? {
                  id: {
                      lt: cursor,
                  },
              }
            : undefined,
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
    const visiblePosts = hasMore ? posts.slice(0, limit) : posts
    const lastPost = visiblePosts.at(-1)

    return response.status(200).json({
        posts: visiblePosts,
        nextCursor: hasMore && lastPost ? lastPost.id : null,
        hasMore,
    })
}
