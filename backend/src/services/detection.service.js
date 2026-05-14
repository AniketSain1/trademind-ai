export const detectPriceChange = (
    previousPrice,
    currentPrice
) => {
    // ==============================
    // NO PREVIOUS DATA
    // ==============================
    if (!previousPrice) {
        return {
            type: "NORMAL",
            strength: "LOW",
            changePercent: "0.0000",
        };
    }

    // ==============================
    // CALCULATE CHANGE %
    // ==============================
    const percent =
        (
            ((currentPrice - previousPrice) /
                previousPrice) *
            100
        );

    const absPercent =
        Math.abs(percent);

    // ==============================
    // MASSIVE BULLISH MOVE
    // ==============================
    if (percent >= 5) {
        return {
            type: "BULLISH_BREAKOUT",
            strength: "EXTREME",
            signal: "BUY",
            changePercent:
                percent.toFixed(4),
        };
    }

    // ==============================
    // STRONG BULLISH MOVE
    // ==============================
    if (percent >= 2) {
        return {
            type: "BULLISH",
            strength: "HIGH",
            signal: "BUY",
            changePercent:
                percent.toFixed(4),
        };
    }

    // ==============================
    // MASSIVE BEARISH MOVE
    // ==============================
    if (percent <= -5) {
        return {
            type: "BEARISH_CRASH",
            strength: "EXTREME",
            signal: "SELL",
            changePercent:
                percent.toFixed(4),
        };
    }

    // ==============================
    // STRONG BEARISH MOVE
    // ==============================
    if (percent <= -2) {
        return {
            type: "BEARISH",
            strength: "HIGH",
            signal: "SELL",
            changePercent:
                percent.toFixed(4),
        };
    }

    // ==============================
    // VOLATILITY SPIKE
    // ==============================
    if (absPercent >= 1) {
        return {
            type: "VOLATILE",
            strength: "MEDIUM",
            signal: "WATCH",
            changePercent:
                percent.toFixed(4),
        };
    }

    // ==============================
    // STABLE MARKET
    // ==============================
    return {
        type: "NORMAL",
        strength: "LOW",
        signal: "HOLD",
        changePercent:
            percent.toFixed(4),
    };
};