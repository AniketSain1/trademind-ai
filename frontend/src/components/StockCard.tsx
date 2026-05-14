import type { StockData } from "../types/stock";

type Props = {
    data: StockData;
};

function StockCard({ data }: Props) {

    const price = Number(data.price || 0);
    const change = Number(data.change || 0);

    const percent =
        data.changePercent || "0%";

    const isPositive =
        change >= 0;

    const textColor = isPositive
        ? "text-emerald-400"
        : "text-red-400";

    const glow = isPositive
        ? "from-emerald-500/10"
        : "from-red-500/10";

    const trendClasses = isPositive
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-red-500/10 text-red-400 border-red-500/20";

    const cardClasses = `
        rounded-2xl
        border border-white/10
        bg-linear-to-br
        ${glow}
        to-white/5
        p-6
    `;

    return (
        <div className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">

            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
                        Live Stock Data
                    </p>

                    <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                        {data.symbol}
                    </h2>
                </div>

                <div className={`rounded-full border px-4 py-2 text-sm font-semibold ${trendClasses}`}>
                    {isPositive
                        ? "📈 Bullish"
                        : "📉 Bearish"}
                </div>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* PRICE */}
                <div className={cardClasses}>

                    <p className="mb-3 text-sm text-slate-400">
                        Current Price
                    </p>

                    <h3 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                        ₹{price.toFixed(2)}
                    </h3>

                </div>

                {/* CHANGE */}
                <div className={cardClasses}>

                    <p className="mb-3 text-sm text-slate-400">
                        Price Change
                    </p>

                    <h3 className={`text-3xl font-black sm:text-4xl lg:text-5xl ${textColor}`}>
                        {isPositive ? "+" : ""}
                        {change.toFixed(2)}
                    </h3>

                </div>

                {/* PERCENT */}
                <div className={cardClasses}>

                    <p className="mb-3 text-sm text-slate-400">
                        Percentage Change
                    </p>

                    <h3 className={`text-3xl font-black sm:text-4xl lg:text-5xl ${textColor}`}>
                        {percent}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default StockCard;