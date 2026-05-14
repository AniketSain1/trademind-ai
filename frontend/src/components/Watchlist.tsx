import {
    memo,
    useEffect,
    useState
} from "react";

import type {
    HistoryItem
} from "../types/stock";

type Props = {
    currentSymbol: string;

    setSymbol: (
        symbol: string
    ) => void;

    history: HistoryItem[];
};

const defaultStocks = [
    "AAPL",
    "TSLA",
    "MSFT",
    "NVDA",
    "RELIANCE.BSE",
    "TCS.BSE",
    "INFY.BSE",
];

const Watchlist = memo(
    function Watchlist({
        currentSymbol,
        setSymbol,
        history
    }: Props) {

        // ==============================
        // LOCAL STATE
        // ==============================
        const [
            watchlist,
            setWatchlist
        ] = useState<string[]>([]);

        const [
            newStock,
            setNewStock
        ] = useState("");

        // ==============================
        // LOAD STORAGE
        // ==============================
        useEffect(() => {

            const saved =
                localStorage.getItem(
                    "watchlist"
                );

            if (saved) {

                setWatchlist(
                    JSON.parse(saved)
                );

            } else {

                setWatchlist(
                    defaultStocks
                );
            }

        }, []);

        // ==============================
        // SAVE STORAGE
        // ==============================
        useEffect(() => {

            localStorage.setItem(
                "watchlist",
                JSON.stringify(
                    watchlist
                )
            );

        }, [watchlist]);

        // ==============================
        // ADD STOCK
        // ==============================
        const addStock = () => {

            const symbol =
                newStock
                    .trim()
                    .toUpperCase();

            // VALIDATION
            if (
                !symbol ||
                symbol.length > 15 ||
                watchlist.includes(
                    symbol
                )
            ) {
                return;
            }

            setWatchlist([
                symbol,
                ...watchlist
            ]);

            setNewStock("");
        };

        // ==============================
        // REMOVE STOCK
        // ==============================
        const removeStock = (
            stock: string
        ) => {

            setWatchlist(
                watchlist.filter(
                    (item) =>
                        item !== stock
                )
            );
        };

        // ==============================
        // GET SNAPSHOT
        // ==============================
        const getSnapshot = (
            stock: string
        ) => {

            const latest =
                history.find(
                    (item) =>
                        item.symbol === stock
                );

            if (!latest) {
                return null;
            }

            return {
                price:
                    latest.price,

                change:
                    latest.changePercent,
            };
        };

        return (

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">

                {/* HEADER */}
                <div className="mb-5">

                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                        Quick Access
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                        Watchlist
                    </h3>

                </div>

                {/* ADD STOCK */}
                <div className="mb-5 space-y-3">

                    <input
                        value={newStock}
                        onChange={(e) =>
                            setNewStock(
                                e.target.value
                            )
                        }
                        placeholder="Add symbol..."
                        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                    />

                    <button
                        onClick={addStock}
                        className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black transition-all hover:bg-cyan-400"
                    >
                        + Add Stock
                    </button>

                </div>

                {/* STOCK LIST */}
                <div className="space-y-3">

                    {watchlist.map(
                        (stock) => {

                            const isActive =
                                currentSymbol === stock;

                            const snapshot =
                                getSnapshot(stock);

                            const isPositive =
                                snapshot?.change?.includes("-")
                                    ? false
                                    : true;

                            return (

                                <div
                                    key={stock}
                                    className={`
                                        flex items-center justify-between
                                        rounded-xl border px-4 py-3
                                        transition-all duration-300
                                        ${
                                            isActive
                                                ? "border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                                                : "border-white/10 bg-slate-950/50 hover:border-cyan-500/20 hover:bg-slate-900"
                                        }
                                    `}
                                >

                                    {/* STOCK BUTTON */}
                                    <button
                                        onClick={() =>
                                            setSymbol(stock)
                                        }
                                        className="flex flex-1 items-center justify-between text-left"
                                    >

                                        <div>

                                            {/* SYMBOL */}
                                            <p
                                                className={`
                                                    font-semibold
                                                    ${
                                                        isActive
                                                            ? "text-cyan-300"
                                                            : "text-slate-300"
                                                    }
                                                `}
                                            >
                                                {stock}
                                            </p>

                                            {/* SNAPSHOT */}
                                            {snapshot && (

                                                <div className="mt-1 flex items-center gap-2 text-xs">

                                                    {/* TREND DOT */}
                                                    <span
                                                        className={`
                                                            h-2 w-2 rounded-full
                                                            ${
                                                                isPositive
                                                                    ? "bg-green-400"
                                                                    : "bg-red-400"
                                                            }

                                                            ${
                                                                isActive
                                                                    ? "animate-pulse"
                                                                    : ""
                                                            }
                                                        `}
                                                    />

                                                    {/* PRICE */}
                                                    <span className="text-slate-400">
                                                        ₹{Number(snapshot.price).toFixed(2)}
                                                    </span>

                                                    {/* CHANGE */}
                                                    <span
                                                        className={
                                                            isPositive
                                                                ? "text-green-400"
                                                                : "text-red-400"
                                                        }
                                                    >
                                                        {snapshot.change}
                                                    </span>

                                                </div>
                                            )}

                                        </div>

                                        {/* ACTIVE */}
                                        {isActive && (
                                            <span>
                                                📈
                                            </span>
                                        )}

                                    </button>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() =>
                                            removeStock(stock)
                                        }
                                        className="ml-3 text-slate-500 transition-all hover:text-red-400"
                                    >
                                        ✕
                                    </button>

                                </div>
                            );
                        }
                    )}

                </div>

            </div>
        );
    }
);

export default Watchlist;