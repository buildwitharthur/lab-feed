function SkeletonPost() {
    return (
        <div className="flex animate-pulse gap-3 border-b border-line px-4 py-3.5 max-[767px]:px-[14px] max-[767px]:py-3">
            <div className="h-9 w-9 shrink-0 rounded-pill bg-surface-raised" />

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-28 rounded-sm bg-surface-raised" />
                    <div className="h-3 w-24 rounded-sm bg-surface-raised" />
                </div>
                <div className="mt-3 space-y-2">
                    <div className="h-4 w-full rounded-sm bg-surface-raised" />
                    <div className="h-4 w-5/6 rounded-sm bg-surface-raised" />
                    <div className="h-4 w-2/5 rounded-sm bg-surface-raised" />
                </div>
                <div className="mt-3 flex max-w-[430px] justify-between">
                    <div className="h-3 w-8 rounded-sm bg-surface-raised" />
                    <div className="h-3 w-8 rounded-sm bg-surface-raised" />
                    <div className="h-3 w-8 rounded-sm bg-surface-raised" />
                    <div className="h-3 w-4 rounded-sm bg-surface-raised" />
                </div>
            </div>
        </div>
    )
}

export function FeedSkeleton() {
    return (
        <div aria-label="Carregando posts" aria-live="polite">
            <SkeletonPost />
            <SkeletonPost />
        </div>
    )
}
