type Props = {
    confidence: number;
};

function ConfidenceMeter({
    confidence
}: Props) {

    // ==============================
    // COLOR LOGIC
    // ==============================
    const color =
        confidence >= 80
            ? "bg-green-400"

            : confidence >= 60
                ? "bg-yellow-400"

                : "bg-red-400";

    const label =
        confidence >= 80
            ? "High Confidence"

            : confidence >= 60
                ? "Moderate Confidence"

                : "Low Confidence";

    return (
        <div
            className="
                rounded-3xl
                border border-white/10
                bg-[#0B1120]
                p-6
                shadow-2xl
            "
        >

            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">

                <div>

                    <p
                        className="
                            text-xs uppercase
                            tracking-[0.3em]
                            text-cyan-400
                        "
                    >
                        AI Certainty
                    </p>

                    <h2
                        className="
                            mt-2 text-3xl
                            font-black text-white
                        "
                    >
                        Confidence Meter
                    </h2>

                </div>

                <div
                    className="
                        text-4xl font-black
                        text-cyan-400
                    "
                >
                    {confidence}%
                </div>

            </div>

            {/* BAR */}
            <div
                className="
                    h-5 overflow-hidden
                    rounded-full
                    bg-slate-800
                "
            >

                <div
                    className={`
                        h-full rounded-full
                        transition-all
                        duration-700
                        ${color}
                    `}
                    style={{
                        width:
                            `${confidence}%`
                    }}
                />

            </div>

            {/* LABEL */}
            <p
                className="
                    mt-4 text-lg
                    font-semibold
                    text-slate-300
                "
            >
                {label}
            </p>

        </div>
    );
}

export default ConfidenceMeter;