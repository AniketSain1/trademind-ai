type Props = {
    signal: string;
};

function SignalCard({
    signal
}: Props) {

    // ==============================
    // STYLES
    // ==============================
    const styles =
        signal === "Buy"
            ? {
                bg:
                    "bg-green-500/10",

                border:
                    "border-green-500/20",

                text:
                    "text-green-400",

                icon:
                    "🚀",

                description:
                    "AI suggests bullish momentum and possible upside continuation.",
            }

            : signal === "Sell"
                ? {
                    bg:
                        "bg-red-500/10",

                    border:
                        "border-red-500/20",

                    text:
                        "text-red-400",

                    icon:
                        "📉",

                    description:
                        "AI detects bearish pressure and downside market risk.",
                }

                : {
                    bg:
                        "bg-yellow-500/10",

                    border:
                        "border-yellow-500/20",

                    text:
                        "text-yellow-400",

                    icon:
                        "⚖️",

                    description:
                        "AI recommends waiting for stronger confirmation signals.",
                };

    return (
        <div
            className={`
                rounded-3xl
                border
                p-6
                shadow-2xl
                ${styles.bg}
                ${styles.border}
            `}
        >

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        AI Recommendation
                    </p>

                    <h2
                        className={`
                            mt-3 text-4xl
                            font-black
                            ${styles.text}
                        `}
                    >
                        {signal}
                    </h2>

                </div>

                <div className="text-5xl">
                    {styles.icon}
                </div>

            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
                {styles.description}
            </p>

        </div>
    );
}

export default SignalCard;