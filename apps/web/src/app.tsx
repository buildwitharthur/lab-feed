import { Suspense } from 'react'

import { Feed } from './components/feed'
import { FeedSkeleton } from './components/feed-skeleton'
import { Header } from './components/header'

export const App = () => {
    return (
        <div className="min-h-screen bg-bg text-text">
            <Header />
            <main className="mx-auto min-h-screen w-full max-w-[var(--content-width)] border-x border-line pt-[52px] max-[767px]:border-x-0">
                <section className="border-b border-line bg-surface px-4 py-3 max-[767px]:px-[14px] max-[767px]:py-[10px]">
                    <h1 className="text-[16px] font-semibold leading-[22px] tracking-[-0.01em] text-text">
                        Para você
                    </h1>
                    <p className="mt-0.5 text-[13px] leading-[18px] text-text-muted">
                        Experimentos, código e coisas que estamos construindo.
                    </p>
                </section>

                <Suspense fallback={<FeedSkeleton />}>
                    <Feed />
                </Suspense>
            </main>
        </div>
    )
}
