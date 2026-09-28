export function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 mx-auto h-[52px] max-w-[var(--content-width)] border-x border-b border-line bg-glass backdrop-blur-[var(--blur-glass)] max-[767px]:border-x-0">
            <div className="flex h-full items-center justify-between px-4 max-[767px]:px-[14px]">
                <a
                    className="flex items-center gap-2 text-text no-underline"
                    href="#"
                    aria-label="LabFeed, inicio"
                >
                    <img
                        className="h-5 w-5 shrink-0"
                        src="/assets/lab-logo.svg"
                        alt=""
                    />
                    <span className="text-[17px] font-semibold leading-6 tracking-[-0.02em]">
                        LabFeed
                    </span>
                    <span className="rounded-pill bg-brand-500 px-1.5 font-mono text-[10px] font-semibold leading-4 tracking-[0.06em] text-on-brand">
                        LAB
                    </span>
                </a>

                <a
                    className="inline-flex items-center gap-1 text-[13px] font-medium leading-5 text-text-muted no-underline transition-colors hover:text-brand-500"
                    href="https://arthurlabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ArthurLabs <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </header>
    )
}
