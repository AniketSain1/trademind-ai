import type {
    NewsItem
} from "../types/stock";

type Props = {
    news: NewsItem[];
};

function NewsPanel({
    news
}: Props) {

    return (
        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-[#0B1120]
                p-6
                shadow-2xl
            "
        >

            {/* HEADER */}
            <div className="mb-6">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-[0.3em]
                        text-cyan-400
                    "
                >
                    Market Intelligence
                </p>

                <h2
                    className="
                        mt-2
                        text-3xl
                        font-black
                        text-white
                    "
                >
                    Latest News
                </h2>

            </div>

            {/* GRID */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    md:grid-cols-2
                "
            >

                {news.map(
                    (
                        item,
                        index
                    ) => (

                        <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-slate-900/70
                                p-5
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-cyan-500/30
                                hover:bg-slate-900
                                hover:shadow-cyan-500/10
                                hover:shadow-2xl
                            "
                        >

                            {/* GLOW */}
                            <div
                                className="
                                    absolute
                                    right-0
                                    top-0
                                    h-24
                                    w-24
                                    rounded-full
                                    bg-cyan-500/10
                                    blur-3xl
                                    opacity-0
                                    transition-opacity
                                    duration-300
                                    group-hover:opacity-100
                                "
                            />

                            {/* CONTENT */}
                            <div className="relative z-10">

                                {/* TAG */}
                                <div
                                    className="
                                        mb-4
                                        inline-flex
                                        items-center
                                        rounded-full
                                        border
                                        border-cyan-500/20
                                        bg-cyan-500/10
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-cyan-400
                                    "
                                >
                                    📰 Live Market News
                                </div>

                                {/* TITLE */}
                                <h3
                                    className="
                                        text-lg
                                        font-bold
                                        leading-relaxed
                                        text-white
                                        transition-colors
                                        duration-300
                                        group-hover:text-cyan-300
                                    "
                                >
                                    {item.title}
                                </h3>

                                {/* FOOTER */}
                                <div
                                    className="
                                        mt-6
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-slate-400
                                        "
                                    >
                                        Open article
                                    </span>

                                    <span
                                        className="
                                            text-cyan-400
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    >
                                        →
                                    </span>

                                </div>

                            </div>

                        </a>
                    )
                )}

            </div>

        </div>
    );
}

export default NewsPanel;