import axios from "axios";
import {
    convertUsdToInr
} from "./currency.service.js";

// ======================================
// FINNHUB API
// ======================================
const FINNHUB_API =
    "https://finnhub.io/api/v1/quote";

// ======================================
// ALPHA VANTAGE API
// ======================================
const ALPHA_API =
    "https://www.alphavantage.co/query";

// ======================================
// NORMALIZE SYMBOL
// ======================================
const normalizeSymbol = (
    symbol,
    provider = "finnhub"
) => {

    // ==============================
    // ALPHA VANTAGE
    // KEEP .BSE / .NSE
    // ==============================
    if (provider === "alpha") {
        return symbol.toUpperCase();
    }

    // ==============================
    // FINNHUB
    // REMOVE MARKET SUFFIX
    // ==============================
    return symbol
        .split(".")[0]
        .toUpperCase();
};

// ======================================
// SAFE NUMBER
// ======================================
const safeNumber = (
    value
) => {

    const num =
        Number(value);

    return isNaN(num)
        ? 0
        : num;
};

// ======================================
// FINNHUB FETCH
// ======================================
const fetchFromFinnhub =
    async (symbol) => {

        const cleanSymbol =
            normalizeSymbol(
                symbol,
                "finnhub"
            );

        const url =
            `${FINNHUB_API}?symbol=${cleanSymbol}&token=${process.env.FINNHUB_API_KEY}`;

        console.log(
            "📡 FINNHUB URL:",
            url
        );

        const response =
            await axios.get(url);

        const data =
            response.data;

        console.log(
            "📊 FINNHUB RAW:"
        );

        console.log(data);

        // ==============================
        // VALIDATION
        // ==============================
        if (
            !data ||
            data.c === undefined
        ) {
            throw new Error(
                "Finnhub invalid data"
            );
        }

        // ==============================
        // PRICE
        // ==============================
        let price =
            safeNumber(data.c);

        // ==============================
        // USD → INR
        // ==============================
        price =
            await convertUsdToInr(
                price
            );

        return {
            symbol,

            // ONLY RETURN PRICE
            price,
        };
    };

// ======================================
// ALPHA VANTAGE FETCH
// ======================================
const fetchFromAlphaVantage =
    async (symbol) => {

        const cleanSymbol =
            normalizeSymbol(
                symbol,
                "alpha"
            );

        const url =
            `${ALPHA_API}?function=GLOBAL_QUOTE&symbol=${cleanSymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

        console.log(
            "📡 ALPHA URL:",
            url
        );

        const response =
            await axios.get(url);

        const quote =
            response.data[
            "Global Quote"
            ];

        console.log(
            "📊 ALPHA RAW:"
        );

        console.log(quote);

        if (!quote) {
            throw new Error(
                "Alpha invalid data"
            );
        }

        const price =
            safeNumber(
                quote[
                "05. price"
                ]
            );

        return {
            symbol,

            // ONLY RETURN PRICE
            price,
        };
    };

// ======================================
// MAIN SERVICE
// ======================================
export const getStockData =
    async (symbol) => {

        // ==============================
        // DETECT INDIAN STOCKS
        // ==============================
        const isIndianStock =
            symbol.includes(".BSE") ||
            symbol.includes(".NSE");

        // ==============================
        // INDIAN STOCKS
        // FORCE ALPHA
        // ==============================
        if (isIndianStock) {

            try {

                console.log(
                    "🇮🇳 Using Alpha for Indian stock..."
                );

                const data =
                    await fetchFromAlphaVantage(
                        symbol
                    );

                console.log(
                    "✅ Alpha Success"
                );

                return data;

            } catch (error) {

                console.log(
                    "⚠️ Alpha Failed:"
                );

                console.log(
                    error.message
                );
            }
        }

        // ==============================
        // NON-INDIAN STOCKS
        // TRY FINNHUB FIRST
        // ==============================
        try {

            console.log(
                "📡 Trying Finnhub..."
            );

            const data =
                await fetchFromFinnhub(
                    symbol
                );

            console.log(
                "✅ Finnhub Success"
            );

            return data;

        } catch (error) {

            console.log(
                "⚠️ Finnhub Failed:"
            );

            console.log(
                error.message
            );
        }

        // ==============================
        // FALLBACK TO ALPHA
        // ==============================
        try {

            console.log(
                "📡 Trying Alpha..."
            );

            const data =
                await fetchFromAlphaVantage(
                    symbol
                );

            console.log(
                "✅ Alpha Success"
            );

            return data;

        } catch (error) {

            console.log(
                "⚠️ Alpha Failed:"
            );

            console.log(
                error.message
            );
        }

        // ==============================
        // FINAL FAILURE
        // ==============================
        throw new Error(
            "All market providers failed"
        );
    };