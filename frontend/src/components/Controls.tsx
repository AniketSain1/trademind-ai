import { useMemo, useState } from "react";

import { stockList } from "../data/stocks";

type Props = {
    symbol: string;

    setSymbol: React.Dispatch<
        React.SetStateAction<string>
    >;

    fetchStock: () => Promise<void>;

    isLive: boolean;

    setIsLive: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function Controls({
    symbol,
    setSymbol,
    fetchStock,
    isLive,
    setIsLive,
}: Props) {

    // ==============================
    // INPUT STATE
    // ==============================
    const [query, setQuery] =
        useState(symbol);

    // ==============================
    // FILTERED STOCKS
    // ==============================
    const filteredStocks =
        useMemo(() => {

            if (!query) return [];

            return stockList.filter(
                (stock) =>
                    stock.symbol
                        .toLowerCase()
                        .includes(
                            query.toLowerCase()
                        ) ||

                    stock.name
                        .toLowerCase()
                        .includes(
                            query.toLowerCase()
                        )
            );

        }, [query]);

    // ==============================
    // SELECT STOCK
    // ==============================
    const selectStock = async (
        stockSymbol: string
    ) => {

        // CLEAN SYMBOL
        const cleanSymbol =
            stockSymbol
                .trim()
                .toUpperCase();

        // UPDATE STATES
        setQuery(cleanSymbol);

        setSymbol(cleanSymbol);

        // FETCH DATA
        await fetchStock();
    };

    // ==============================
    // SEARCH BUTTON
    // ==============================
    const handleSearch =
        async () => {

            if (!query.trim()) return;

            const cleanSymbol =
                query
                    .trim()
                    .toUpperCase();

            setQuery(cleanSymbol);

            setSymbol(cleanSymbol);

            await fetchStock();
        };

    // ==============================
    // ENTER KEY
    // ==============================
    const handleKeyDown = async (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (e.key === "Enter") {
            await handleSearch();
        }
    };

    // ==============================
    // STYLES
    // ==============================
    const buttonBase =
        `
            w-full rounded-2xl px-4 py-3
            font-semibold text-white
            transition-all duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
        `;

    const statusClasses =
        isLive
            ? `
                border-green-500/20
                bg-green-500/10
                text-green-400
            `
            : `
                border-red-500/20
                bg-red-500/10
                text-red-400
            `;

    return (

        <div className="space-y-6">

            {/* SEARCH */}
            <div className="relative">

                <label className="mb-2 block text-sm font-medium text-slate-400">
                    Search Stock
                </label>

                <input
                    value={query}

                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }

                    onKeyDown={
                        handleKeyDown
                    }

                    placeholder="Search stocks..."

                    className="
                        w-full rounded-2xl
                        border border-white/10
                        bg-slate-900/80
                        px-4 py-3
                        text-white outline-none
                        transition-all duration-300
                        placeholder:text-slate-500
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-400/20
                    "
                />

                {/* DROPDOWN */}
                {query &&
                    filteredStocks.length > 0 && (

                        <div
                            className="
                                absolute z-50 mt-2
                                max-h-72 w-full
                                overflow-y-auto
                                rounded-2xl
                                border border-white/10
                                bg-slate-950
                                shadow-2xl
                            "
                        >

                            {filteredStocks.map(
                                (stock) => (

                                    <button
                                        key={
                                            stock.symbol
                                        }

                                        onClick={() =>
                                            selectStock(
                                                stock.symbol
                                            )
                                        }

                                        className="
                                            w-full border-b
                                            border-white/5
                                            px-4 py-3
                                            text-left
                                            transition-all
                                            duration-200
                                            hover:bg-white/5
                                        "
                                    >

                                        <p className="font-semibold text-white">
                                            {
                                                stock.symbol
                                            }
                                        </p>

                                        <p className="text-sm text-slate-400">
                                            {
                                                stock.name
                                            }
                                        </p>

                                    </button>
                                )
                            )}

                        </div>
                    )}

            </div>

            {/* FETCH BUTTON */}
            <button
                onClick={handleSearch}

                className={`
                    ${buttonBase}
                    bg-linear-to-r
                    from-cyan-500
                    to-blue-500
                    hover:shadow-lg
                    hover:shadow-cyan-500/20
                `}
            >

                Fetch Stock Data

            </button>

            {/* LIVE BUTTON */}
            <button
                onClick={() =>
                    setIsLive(!isLive)
                }

                className={`
                    ${buttonBase}

                    ${
                        isLive
                            ? `
                                bg-linear-to-r
                                from-red-500
                                to-rose-500
                                hover:shadow-lg
                                hover:shadow-red-500/20
                            `
                            : `
                                bg-linear-to-r
                                from-emerald-500
                                to-green-500
                                hover:shadow-lg
                                hover:shadow-green-500/20
                            `
                    }
                `}
            >

                {isLive
                    ? "Stop Live Monitoring"
                    : "Start Live Monitoring"}

            </button>

            {/* STATUS */}
            <div
                className={`
                    rounded-2xl
                    border p-4
                    text-center text-sm
                    font-medium
                    backdrop-blur-xl
                    ${statusClasses}
                `}
            >

                {isLive
                    ? "🟢 AI monitoring active"
                    : "🔴 Monitoring paused"}

            </div>

        </div>
    );
}

export default Controls;