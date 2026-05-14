import {
    memo,
    useMemo
} from "react";

import type {
    HistoryItem
} from "../types/stock";

type Props = {
    history: HistoryItem[];
};

const MarketHeat = memo(
    function MarketHeat({
        history
    }: Props) {

        // ==============================
        // MEMOIZED MARKET DATA
        // ==============================
        const {
            bullish,
            bearish,
            bullishPercent,
            bearishPercent,
            mood
        } = useMemo(() => {

            // ==============================
            // MARKET PRESSURE
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

            const total =
                bullish + bearish;

            // ==============================
            // PERCENTAGES
            // ==============================
            const bullishPercent =
                total > 0
                    ? (bullish / total) * 100
                    : 50;

            const bearishPercent =
                total > 0
                    ? (bearish / total) * 100
                    : 50;

            // ==============================
            // MARKET MOOD
            // ==============================
            const mood =
                bullishPercent >
                bearishPercent

                    ? "Bullish Market"

                    : bearishPercent >
                        bullishPercent

                        ? "Bearish Market"

                        : "Neutral Market";

            return {
                bullish,
                bearish,
                bullishPercent,
                bearishPercent,
                mood
            };

        }, [history]);

        return (

            <div className="rounded-3xl border border-white/10 bg-[#0B1120] p-6 shadow-2xl">

                {/* HEADER */}
                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <p className="text-xs uppercase tracking-[0.3em] text-orange-400">
                            Market Intelligence
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-white">
                            Market Heat
                        </h2>

                    </div>

                    <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                        {mood}
                    </div>

                </div>

                {/* HEAT BARS */}
                <div className="space-y-5">

                    {/* BULLISH */}
                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <span className="font-semibold text-green-400">
                                Bullish Pressure
                            </span>

                            <span className="text-sm text-slate-400">
                                {bullishPercent.toFixed(0)}%
                            </span>

                        </div>

                        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

                            <div
                                className="h-full rounded-full bg-green-400 transition-all duration-700"
                                style={{
                                    width:
                                        `${bullishPercent}%`
                                }}
                            />

                        </div>

                    </div>

                    {/* BEARISH */}
                    <div>

                        <div className="mb-2 flex items-center justify-between">

                            <span className="font-semibold text-red-400">
                                Bearish Pressure
                            </span>

                            <span className="text-sm text-slate-400">
                                {bearishPercent.toFixed(0)}%
                            </span>

                        </div>

                        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

                            <div
                                className="h-full rounded-full bg-red-400 transition-all duration-700"
                                style={{
                                    width:
                                        `${bearishPercent}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>
        );
    }
);

export default MarketHeat;