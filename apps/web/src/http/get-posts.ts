import { api } from '../lib/axios'

type GetPostsParams = {
    cursor?: number | null
    limit?: number
}

export async function getPosts({
    cursor,
    limit = 10,
}: GetPostsParams): Promise<GetPostsResponse> {
    const response = await api.get<GetPostsResponse>('/posts', {
        params: {
            limit,
            cursor: cursor ?? undefined,
        },
    })

    return response.data
}
