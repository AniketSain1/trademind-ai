import {
    memo,
    useMemo
} from "react";

import type {
    AIAnalysis
} from "../types/stock";

type Props = {
    analysis: AIAnalysis;
};

const AIInsightPanel = memo(
    function AIInsightPanel({
        analysis
    }: Props) {

        // ==============================
        // AI VALUES
        // ==============================
        const {
            summary,
            sentiment,
            confidence,
            risk,
            signal,
        } = analysis;

        // ==============================
        // MEMOIZED UI STYLES
        // ==============================
        const {
            sentimentColor,
            signalStyles,
            riskColor
        } = useMemo(() => {

            const sentimentColor =
                sentiment === "Bullish"
                    ? "text-green-400"

                    : sentiment === "Bearish"
                        ? "text-red-400"

                        : "text-yellow-400";

            const signalStyles =
                signal === "Buy"

                    ? "bg-green-500/10 text-green-400 border-green-500/20"

                    : signal === "Sell"

                        ? "bg-red-500/10 text-red-400 border-red-500/20"

                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

            const riskColor =
                risk === "High"

                    ? "text-red-400"

                    : risk === "Medium"

                        ? "text-yellow-400"

                        : "text-green-400";

            return {
                sentimentColor,
                signalStyles,
                riskColor
            };

        }, [
            sentiment,
            signal,
            risk
        ]);

        return (

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120] p-6 shadow-2xl">

                {/* GLOW */}
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

                {/* HEADER */}
                <div className="relative z-10 mb-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
                                AI Intelligence
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-white">
                                Market Analysis
                            </h2>

                        </div>

                        {/* SIGNAL */}
                        <div
                            className={`
                                rounded-full border
                                px-4 py-2 text-sm
                                font-bold
                                ${signalStyles}
                            `}
                        >
                            {signal}
                        </div>

                    </div>

                </div>

                {/* METRICS */}
                <div className="relative z-10 mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                    {/* SENTIMENT */}
                    <MetricCard
                        label="Sentiment"
                        value={sentiment}
                        color={sentimentColor}
                    />

                    {/* RISK */}
                    <MetricCard
                        label="Risk Level"
                        value={risk}
                        color={riskColor}
                    />

                    {/* CONFIDENCE */}
                    <MetricCard
                        label="AI Confidence"
                        value={`${confidence}%`}
                        color="text-cyan-400"
                    />

                </div>

                {/* SUMMARY */}
                <div className="relative z-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">

                    <p className="text-lg leading-relaxed text-slate-200">
                        {summary}
                    </p>

                </div>

            </div>
        );
    }
);

// ==============================
// METRIC CARD
// ==============================
const MetricCard = memo(
    function MetricCard({
        label,
        value,
        color,
    }: {
        label: string;
        value: string;
        color: string;
    }) {

        return (

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">

                <p className="text-sm text-slate-400">
                    {label}
                </p>

                <h3
                    className={`
                        mt-2 text-2xl
                        font-bold
                        ${color}
                    `}
                >
                    {value}
                </h3>

            </div>
        );
    }
);

export default AIInsightPanel;