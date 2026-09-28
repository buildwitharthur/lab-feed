import {
    Bookmark,
    Heart,
    MessageCircle,
    Repeat2,
} from 'lucide-react'

type FeedCardProps = {
    post: FeedPost
}

function formatPostDate(createdAt: string) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
    }).format(new Date(createdAt))
}

export function FeedCard({ post }: FeedCardProps) {
    const fallbackLetter = post.author.name.charAt(0).toUpperCase()

    return (
        <article className="flex gap-3 border-b border-line px-4 py-3.5 transition-colors hover:bg-surface-raised max-[767px]:px-[14px] max-[767px]:py-3">
            {post.author.avatarUrl ? (
                <img
                    className="h-9 w-9 shrink-0 rounded-pill object-cover"
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                />
            ) : (
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-tint-success text-[13px] font-semibold text-brand-300">
                    {fallbackLetter}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[14px] leading-5">
                    <strong className="font-semibold text-text">
                        {post.author.name}
                    </strong>
                    <span className="text-[13px] text-text-muted">
                        @{post.author.username} · {formatPostDate(post.createdAt)}
                    </span>
                    <span
                        className="ml-auto text-[15px] leading-5 text-text-subtle"
                        aria-hidden="true"
                    >
                        •••
                    </span>
                </div>

                <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-[22px] text-text-2">
                    {post.content}
                </p>

                {post.code && (
                    <pre className="mt-3 overflow-x-auto rounded-md border border-line bg-surface-raised p-3 font-mono text-[12px] leading-5 text-text-2">
                        <code>{post.code}</code>
                    </pre>
                )}

                <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                        <span
                            className="rounded-[4px] bg-tint-success px-1.5 font-mono text-[12px] leading-5 text-brand-300"
                            key={tag}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="mt-3 flex max-w-[430px] items-center justify-between font-mono text-[12px] leading-4 text-text-subtle">
                    <span className="inline-flex items-center gap-1.5">
                        <MessageCircle aria-hidden="true" size={14} strokeWidth={1.5} />
                        {post.commentsCount}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Repeat2 aria-hidden="true" size={14} strokeWidth={1.5} />
                        {post.repostsCount}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Heart aria-hidden="true" size={14} strokeWidth={1.5} />
                        {post.likesCount}
                    </span>
                    <span>
                        <Bookmark aria-hidden="true" size={14} strokeWidth={1.5} />
                    </span>
                </div>
            </div>
        </article>
    )
}
