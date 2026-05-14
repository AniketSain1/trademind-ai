const BASE_URL =
    "http://localhost:5001/api/stocks";

// ==============================
// GET STOCK
// ==============================
export const getStock =
    async (
        symbol: string
    ) => {

        const res =
            await fetch(
                `${BASE_URL}/${symbol}`
            );

        return res.json();
    };

// ==============================
// GET HISTORY
// ==============================
export const getHistory =
    async (
        symbol?: string
    ) => {

        const query =
            symbol
                ? `?symbol=${symbol}`
                : "";

        const res =
            await fetch(
                `${BASE_URL}/history${query}`
            );

        return res.json();
    };