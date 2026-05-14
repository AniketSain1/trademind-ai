import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import MarketSummary from "../components/MarketSummary";
import StockCard from "../components/StockCard";
import HistoryTable from "../components/HistoryTable";
import EventAlert from "../components/EventAlert";
import Controls from "../components/Controls";
import AIInsightPanel from "../components/AIInsightPanel";
import ConfidenceMeter from "../components/ConfidenceMeter";
import NewsPanel from "../components/NewsPanel";
import StockChart from "../components/StockChart";
import AnimatedSection from "../components/AnimatedSection";
import Watchlist from "../components/Watchlist";
import MarketTicker from "../components/MarketTicker";
import SkeletonCard from "../components/SkeletonCard";
import SignalCard from "../components/SignalCard";
import MarketHeat from "../components/MarketHeat";

import { useStockData } from "../hooks/useStockData";

function Dashboard() {

    // ==============================
    // LOCAL STATE
    // ==============================
    const [symbol, setSymbol] =
        useState("RELIANCE.BSE");

    const [isLive, setIsLive] =
        useState(false);

    // ==============================
    // STOCK DATA
    // ==============================
    const {
        news,
        explanation,
        data,
        event,
        history,
        loading,
        error,
        fetchStock,
    } = useStockData(
        symbol,
        isLive
    );

    // ==============================
    // FILTERED HISTORY
    // ==============================
   const filteredHistory =
    useMemo(() => {

        const normalizedSymbol =
            symbol
                .trim()
                .toUpperCase();

        return history.filter(
            (item) => {

                const itemSymbol =
                    item.symbol
                        ?.trim()
                        ?.toUpperCase();

                return (
                    itemSymbol ===
                    normalizedSymbol
                );
            }
        );

    }, [
        history,
        symbol
    ]);

    // ==============================
    // MARKET TICKER
    // ==============================
    const tickerData =
        useMemo(() => {

            const uniqueStocks =
                new Map();

            history.forEach((item) => {

                if (
                    !uniqueStocks.has(
                        item.symbol
                    )
                ) {

                    uniqueStocks.set(
                        item.symbol,
                        {
                            symbol:
                                item.symbol,

                            price:
                                Number(
                                    item.price
                                ),

                            changePercent:
                                item.changePercent,
                        }
                    );
                }
            });

            return Array.from(
                uniqueStocks.values()
            ).slice(0, 10);

        }, [history]);

    // ==============================
    // TOAST ALERTS
    // ==============================
    useEffect(() => {

        if (!event) return;

        if (event.type === "SPIKE") {

            toast.success(
                `🚀 ${symbol} spike detected!`
            );
        }

        if (event.type === "DROP") {

            toast.error(
                `📉 ${symbol} dropped sharply!`
            );
        }

    }, [
        event,
        symbol
    ]);

    // ==============================
    // STATUS STYLES
    // ==============================
    const statusClasses = isLive
        ? "border border-green-500/30 bg-green-500/20 text-green-400"
        : "border border-red-500/30 bg-red-500/20 text-red-400";

    return (

        <div className="min-h-screen bg-[#020617] text-white">

            {/* MARKET TICKER */}
            <MarketTicker
                data={tickerData}
            />

            {/* NAVBAR */}
            <nav className="border-b border-white/10 bg-white/5 backdrop-blur-xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            📈 TradeMind
                        </h1>

                        <p className="text-sm text-slate-400">
                            AI Powered Stock Intelligence
                        </p>

                    </div>

                    {/* STATUS */}
                    <div className="flex items-center gap-4">

                        {/* UPDATED */}
                        {data && (

                            <div className="hidden rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 md:flex">

                                ⏱ Updated:

                                <span className="ml-2 font-semibold text-white">
                                    {new Date().toLocaleTimeString()}
                                </span>

                            </div>
                        )}

                        {/* LIVE STATUS */}
                        <div
                            className={`
                                flex items-center gap-2 rounded-full
                                px-4 py-2 text-sm font-semibold
                                ${statusClasses}
                            `}
                        >

                            <span
                                className={`
                                    h-2 w-2 rounded-full
                                    ${
                                        isLive
                                            ? "animate-pulse bg-green-400"
                                            : "bg-red-400"
                                    }
                                `}
                            />

                            {isLive
                                ? "Live Monitoring"
                                : "Monitoring Off"}

                        </div>

                    </div>

                </div>

            </nav>

            {/* MAIN */}
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-4 py-5 lg:grid-cols-12 lg:px-6">

                {/* SIDEBAR */}
                <aside className="order-2 lg:order-1 lg:col-span-3 xl:col-span-2">

                    <div className="sticky top-5 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                        <h2 className="mb-6 text-xl font-bold">
                            Dashboard Controls
                        </h2>

                        <Controls
                            symbol={symbol}
                            setSymbol={setSymbol}
                            fetchStock={fetchStock}
                            isLive={isLive}
                            setIsLive={setIsLive}
                        />

                        <Watchlist
                            currentSymbol={symbol}
                            setSymbol={setSymbol}
                            history={history}
                        />

                        {/* QUICK INFO */}
                        <div className="mt-8 space-y-4">

                            <InfoCard
                                label="Current Symbol"
                                value={symbol}
                            />

                            <InfoCard
                                label="Total Records"
                                value={history.length}
                            />

                        </div>

                    </div>

                </aside>

                {/* CONTENT */}
                <main className="order-1 space-y-5 lg:order-2 lg:col-span-9 xl:col-span-10">

                    {/* HERO */}
                    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-6 md:p-8">

                        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />

                        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

                        <div className="relative z-10">

                            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
                                Real-Time AI Monitoring
                            </p>

                            <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">

                                Professional AI Powered

                                <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                    {" "}Stock Intelligence
                                </span>

                            </h1>

                            <p className="mt-4 max-w-2xl text-base text-slate-400">
                                Track live stock activity,
                                detect spikes,
                                monitor history,
                                and receive AI-driven insights in real time.
                            </p>

                        </div>

                    </section>

                    {/* LOADING */}
                    {loading && (
                        <SkeletonCard />
                    )}

                    {/* ERROR */}
                    {error && (
                        <StatusCard
                            type="error"
                            text={error}
                        />
                    )}

                    {/* EMPTY */}
                    {!loading && !data && !error && (

                        <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-10 text-center">

                            <div className="mb-6 text-6xl">
                                📈
                            </div>

                            <h2 className="text-3xl font-black text-white">
                                Start Monitoring Stocks
                            </h2>

                        </div>
                    )}

                    {/* MARKET HEAT */}
                    {history.length > 0 && (
                        <AnimatedSection delay={0.1}>
                            <MarketHeat history={history} />
                        </AnimatedSection>
                    )}

                    {/* MARKET SUMMARY */}
                    {history.length > 0 && (
                        <AnimatedSection delay={0.15}>
                            <MarketSummary history={history} />
                        </AnimatedSection>
                    )}

                    {/* STOCK CARD */}
                    {data && (
                        <AnimatedSection delay={0.2}>
                            <StockCard data={data} />
                        </AnimatedSection>
                    )}

                    {/* EVENT ALERT */}
                    {event && (
                        <AnimatedSection delay={0.25}>
                            <EventAlert event={event} />
                        </AnimatedSection>
                    )}

                    {/* SIGNAL */}
                    {explanation?.signal && (
                        <AnimatedSection delay={0.3}>
                            <SignalCard signal={explanation.signal} />
                        </AnimatedSection>
                    )}

                    {/* CONFIDENCE */}
                    {explanation?.confidence && (
                        <AnimatedSection delay={0.2}>
                            <ConfidenceMeter
                                confidence={explanation.confidence}
                            />
                        </AnimatedSection>
                    )}

                    {/* AI */}
                    {explanation && (
                        <AnimatedSection delay={0.3}>
                            <AIInsightPanel
                                analysis={explanation}
                            />
                        </AnimatedSection>
                    )}

                    {/* NEWS */}
                    {news.length > 0 && (
                        <AnimatedSection>
                            <NewsPanel news={news} />
                        </AnimatedSection>
                    )}

                    {/* CHART + HISTORY */}
                    {filteredHistory.length > 0 && (
                        <>
                            <AnimatedSection>
                                <StockChart history={filteredHistory} />
                            </AnimatedSection>

                            <AnimatedSection>
                                <HistoryTable history={filteredHistory} />
                            </AnimatedSection>
                        </>
                    )}

                </main>

            </div>

        </div>
    );
}

// ==============================
// INFO CARD
// ==============================
function InfoCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {

    return (

        <div className="rounded-2xl bg-slate-900/60 p-4">

            <p className="text-sm text-slate-400">
                {label}
            </p>

            <h3 className="mt-1 text-lg font-bold">
                {value}
            </h3>

        </div>
    );
}

// ==============================
// STATUS CARD
// ==============================
function StatusCard({
    type,
    text,
}: {
    type: "loading" | "error";
    text: string;
}) {

    const styles =
        type === "loading"
            ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
            : "border border-red-500/20 bg-red-500/10 text-red-400";

    return (
        <div className={`rounded-2xl p-4 text-center backdrop-blur-xl ${styles}`}>
            {text}
        </div>
    );
}

export default Dashboard;