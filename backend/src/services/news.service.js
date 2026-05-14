export const getNews = async (
    symbol
) => {
    try {
        // ==============================
        // LOAD ENV INSIDE FUNCTION
        // ==============================
        const API_KEY =
            process.env.FINNHUB_API_KEY;

        console.log(
            "FINNHUB KEY:",
            API_KEY
        );

        // ==============================
        // CLEAN SYMBOL
        // ==============================
        const cleanSymbol =
            symbol
                .split(".")[0]
                .toUpperCase();

        console.log(
            "SYMBOL:",
            cleanSymbol
        );

        // ==============================
        // DATE RANGE
        // ==============================
        const today =
            new Date();

        const from =
            new Date();

        from.setDate(
            today.getDate() - 7
        );

        const toDate =
            today
                .toISOString()
                .split("T")[0];

        const fromDate =
            from
                .toISOString()
                .split("T")[0];

        // ==============================
        // URL
        // ==============================
        const url =
            `https://finnhub.io/api/v1/company-news?symbol=${cleanSymbol}&from=${fromDate}&to=${toDate}&token=${API_KEY}`;

        console.log(
            "NEWS URL:",
            url
        );

        // ==============================
        // FETCH
        // ==============================
        const res =
            await fetch(url);

        const json =
            await res.json();

        console.log(
            "FINNHUB RAW RESPONSE:"
        );

        console.log(json);

        // ==============================
        // INVALID RESPONSE
        // ==============================
        if (!Array.isArray(json)) {
            throw new Error(
                "Invalid Finnhub response"
            );
        }

        // ==============================
        // EMPTY NEWS
        // ==============================
        if (json.length === 0) {
            return [
                {
                    title:
                        `${cleanSymbol} market activity remained stable with limited major news coverage.`,

                    url:
                        "https://finnhub.io",
                },
            ];
        }

        // ==============================
        // RETURN NEWS
        // ==============================
        return json
            .slice(0, 3)
            .map((article) => ({
                title:
                    article.headline,

                url:
                    article.url,
            }));

    } catch (error) {
        console.error(
            "NEWS ERROR:"
        );

        console.error(error);

        return [];
    }
};