import type {
    HistoryItem
} from "../types/stock";

type Props = {
    history: HistoryItem[];
};

function MarketSummary({
    history
}: Props) {

    // ==============================
    // UNIQUE STOCKS
    // ==============================
    const uniqueStocks =
        new Set(
            history.map(
                (item) =>
                    item.symbol
            )
        );

    // ==============================
    // MARKET STATS
    // ==============================
    const bullish =
        history.filter(
            (item) =>
                Number(item.change) > 0
        ).length;

    const bearish =
        history.filter(
            (item) =>
                Number(item.change) < 0
        ).length;

    const avgMovement =
        history.length > 0
            ? (
                history.reduce(
                    (
                        acc,
                        item
                    ) =>
                        acc +
                        Math.abs(
                            Number(
                                item.change
                            )
                        ),
                    0
                ) / history.length
            ).toFixed(2)
            : "0.00";

    // ==============================
    // CARDS
    // ==============================
    const cards = [
        {
            label:
                "Tracked Stocks",

            value:
                uniqueStocks.size,

            color:
                "text-cyan-400",

            bg:
                "bg-cyan-500/10",
        },

        {
            label:
                "Bullish Signals",

            value:
                bullish,

            color:
                "text-green-400",

            bg:
                "bg-green-500/10",
        },

        {
            label:
                "Bearish Signals",

            value:
                bearish,

            color:
                "text-red-400",

            bg:
                "bg-red-500/10",
        },

        {
            label:
                "Avg Movement",

            value:
                `₹${avgMovement}`,

            color:
                "text-violet-400",

            bg:
                "bg-violet-500/10",
        },
    ];

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
            <div className="mb-6">

                <p
                    className="
                        text-xs uppercase
                        tracking-[0.3em]
                        text-cyan-400
                    "
                >
                    Market Overview
                </p>

                <h2
                    className="
                        mt-2 text-3xl
                        font-black text-white
                    "
                >
                    Market Summary
                </h2>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                {cards.map(
                    (
                        card
                    ) => (

                        <div
                            key={
                                card.label
                            }
                            className={`
                                rounded-2xl
                                border border-white/10
                                p-5
                                ${card.bg}
                            `}
                        >

                            <p className="text-sm text-slate-400">
                                {card.label}
                            </p>

                            <h3
                                className={`
                                    mt-3 text-3xl
                                    font-black
                                    ${card.color}
                                `}
                            >
                                {card.value}
                            </h3>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default MarketSummary;