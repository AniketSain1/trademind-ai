import {
    useEffect,
    useRef,
    useState
} from "react";

import type {
    AIAnalysis,
    NewsItem,
    StockData,
    EventData,
    HistoryItem,
} from "../types/stock";

import {
    getStock,
    getHistory,
} from "../services/api";

export function useStockData(
    symbol: string,
    isLive: boolean
) {

    // ==============================
    // STATE
    // ==============================
    const [data, setData] =
        useState<StockData | null>(null);

    const [event, setEvent] =
        useState<EventData>(null);

    const [news, setNews] =
        useState<NewsItem[]>([]);

    const [
        explanation,
        setExplanation
    ] = useState<
        AIAnalysis | null
    >(null);

    const [history, setHistory] =
        useState<HistoryItem[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [lastEvent, setLastEvent] =
        useState("");

    // ==============================
    // REFS
    // ==============================
    const previousPriceRef =
        useRef<number | null>(null);

    // ==============================
    // FETCH HISTORY
    // ==============================
    const fetchHistory =
        async () => {

            try {

                const json =
                    await getHistory(symbol);

                if (
                    json.success
                ) {

                    setHistory(
                        (prev) => {

                            // PREVENT
                            // UNNECESSARY
                            // HISTORY RERENDER
                            const prevLatest =
                                prev[0];

                            const newLatest =
                                json.data[0];

                            // SAME LATEST RECORD
                            if (
                                prevLatest?.id ===
                                newLatest?.id
                            ) {
                                return prev;
                            }

                            return json.data;
                        }
                    );
                }

            } catch (error) {

                console.log(error);
            }
        };

    // ==============================
    // FETCH STOCK
    // ==============================
    const fetchStock =
        async () => {

            try {

                // ==============================
                // INITIAL LOADING ONLY
                // ==============================
                const isInitialLoad =
                    !data &&
                    !previousPriceRef.current;

                if (isInitialLoad) {
                    setLoading(true);
                }

                setError("");

                const json =
                    await getStock(
                        symbol
                    );

                if (
                    !json.success
                ) {

                    throw new Error(
                        json.message
                    );
                }

                // ==============================
                // INVALID PRICE PROTECTION
                // ==============================
                const newPrice =
                    Number(
                        json.data.price
                    );

                if (
                    !newPrice ||
                    Number.isNaN(
                        newPrice
                    ) ||
                    newPrice <= 0
                ) {

                    console.log(
                        "⏭️ Invalid price skipped"
                    );

                    return;
                }

                // ==============================
                // PREVIOUS PRICE
                // ==============================
                const previousPrice =
                    previousPriceRef.current;

                const priceChanged =
                    previousPrice !==
                    newPrice;

                // STORE PRICE
                previousPriceRef.current =
                    newPrice;

                // ==============================
                // ALWAYS UPDATE DATA
                // WHEN SYMBOL CHANGES
                // ==============================
                setData(
                    json.data
                );

                setEvent(
                    json.event
                );

                setNews(
                    json.news || []
                );

                setExplanation(
                    json.explanation || null
                );

                // ==============================
                // ALWAYS REFRESH HISTORY
                // ==============================
                await fetchHistory();

                // ==============================
                // ALERTS
                // ==============================
                if (
                    priceChanged &&
                    json.event &&
                    json.event.type !== "NORMAL"
                ) {

                    const eventKey =
                        `${json.event.type}-${json.event.changePercent}`;

                    if (
                        eventKey !==
                        lastEvent
                    ) {

                        alert(
                            `🚨 ${json.event.type} detected! Change: ${json.event.changePercent}%`
                        );

                        setLastEvent(
                            eventKey
                        );
                    }
                }

            } catch (err: any) {

                setError(
                    err.message
                );

            } finally {

                // ==============================
                // STOP LOADING
                // ==============================
                setLoading(false);
            }
        };

    // ==============================
    // INITIAL HISTORY
    // ==============================
    useEffect(() => {

        // ==============================
        // FETCH IMMEDIATELY
        // ==============================
        fetchStock();

        // ==============================
        // STOP IF NOT LIVE
        // ==============================
        if (!isLive) return;

        // ==============================
        // LIVE INTERVAL
        // ==============================
        const interval =
            setInterval(() => {

                fetchStock();

            }, 5000);

        return () =>
            clearInterval(interval);

    }, [
        isLive,
        symbol
    ]);

    return {
        news,
        explanation,
        data,
        event,
        history,
        loading,
        error,
        fetchStock,
    };
}