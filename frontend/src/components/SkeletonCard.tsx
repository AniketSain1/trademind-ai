function SkeletonCard() {

    return (
        <div
            className="
                animate-pulse
                rounded-3xl
                border border-white/10
                bg-slate-900/70
                p-8
            "
        >

            {/* TITLE */}
            <div className="mb-8">

                <div
                    className="
                        mb-4 h-4
                        w-32 rounded-full
                        bg-slate-700
                    "
                />

                <div
                    className="
                        h-10
                        w-64 rounded-full
                        bg-slate-700
                    "
                />

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {[1, 2, 3].map(
                    (item) => (
                        <div
                            key={item}
                            className="
                                rounded-2xl
                                border border-white/10
                                bg-slate-800/50
                                p-6
                            "
                        >

                            <div
                                className="
                                    mb-4 h-4
                                    w-24 rounded-full
                                    bg-slate-700
                                "
                            />

                            <div
                                className="
                                    h-10
                                    w-32 rounded-full
                                    bg-slate-700
                                "
                            />

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default SkeletonCard;