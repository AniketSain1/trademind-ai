import { getStockData } from "../services/stock.service.js";

import {
    getPreviousPrice,
    setPrice
} from "../utils/priceStore.js";

import { detectPriceChange } from "../services/detection.service.js";

import { getNews } from "../services/news.service.js";

import { generateExplanation } from "../services/ai.service.js";

import prisma from "../config/db.js";

export const fetchStock =
    async (req, res) => {

        try {

            console.log(
                "🔥 CONTROLLER HIT"
            );

            const { symbol } =
                req.params;

            // ==============================
            // STEP 1: STOCK DATA
            // ==============================
            let stock;

            try {

                stock =
                    await getStockData(
                        symbol
                    );
                // ==============================
                // INVALID PRICE PROTECTION
                // ==============================
                if (
                    !stock.price ||
                    Number(stock.price) <= 0 ||
                    Number.isNaN(stock.price)
                ) {

                    throw new Error(
                        "Invalid stock price received"
                    );
                }

                console.log(
                    "✅ REAL STOCK DATA:",
                    stock
                );

            } catch (err) {

                console.log(
                    "⚠️ Stock API failed → using fallback"
                );

                stock = {
                    symbol,
                    price: 1430.85,
                };
            }

            // ==============================
            // STEP 2: PREVIOUS PRICE
            // ==============================
            const previousPrice =
                getPreviousPrice(
                    symbol
                );

            // ==============================
            // STEP 3: CALCULATE CHANGE
            // ==============================
            let change = 0;

            let changePercent =
                "0.0000%";

            if (
                previousPrice &&
                previousPrice !== 0
            ) {

                change =
                    stock.price -
                    previousPrice;

                const calculatedPercent =
                    (
                        (change /
                            previousPrice) *
                        100
                    );

                changePercent =
                    `${calculatedPercent.toFixed(
                        4
                    )}%`;
            }

            // ==============================
            // STEP 4: UPDATE STOCK OBJECT
            // ==============================
            stock.change =
                Number(
                    change.toFixed(2)
                );

            stock.changePercent =
                changePercent;

            // ==============================
            // STEP 5: EVENT DETECTION
            // ==============================
            const event =
                detectPriceChange(
                    previousPrice,
                    stock.price
                );

            // ==============================
            // STEP 6: STORE LATEST PRICE
            // ==============================
            setPrice(
                symbol,
                stock.price
            );

            console.log(
                "PREVIOUS:",
                previousPrice
            );

            console.log(
                "CURRENT:",
                stock.price
            );

            console.log(
                "CHANGE:",
                stock.change
            );

            console.log(
                "CHANGE %:",
                stock.changePercent
            );

            console.log(
                "EVENT:",
                event
            );

            // ==============================
            // STEP 7: NEWS
            // ==============================
            let news = [];

            if (event) {

                try {

                    const query =
                        symbol
                            .split(".")[0];

                    news =
                        await getNews(
                            query
                        );

                    // FALLBACK
                    if (
                        !news ||
                        news.length === 0
                    ) {

                        news = [
                            {
                                title:
                                    `${query} stock moved significantly`,

                                url:
                                    "https://example.com"
                            }
                        ];
                    }

                } catch (err) {

                    console.log(
                        "⚠️ News API failed → using fallback"
                    );

                    news = [
                        {
                            title:
                                `${symbol} movement detected`,

                            url:
                                "https://example.com"
                        }
                    ];
                }
            }

            // ==============================
            // STEP 8: AI
            // ==============================
            const explanation =
                await generateExplanation({
                    symbol,
                    priceData: stock,
                    event,
                    news,
                });

            // ==============================
            // DEBUG
            // ==============================
            console.log(
                "🚀 BEFORE DB SAVE"
            );

            // ==============================
            // PREVENT DUPLICATE SAVES
            // ==============================
            const latestRecord =
                await prisma.stockEvent.findFirst({

                    where: {
                        symbol:
                            stock.symbol
                    },

                    orderBy: {
                        createdAt:
                            "desc"
                    }
                });

            // SAME PRICE?
            const roundedLatest =
                Number(
                    latestRecord?.price
                ).toFixed(2);

            const roundedCurrent =
                Number(
                    stock.price
                ).toFixed(2);

            const samePrice =
                roundedLatest ===
                roundedCurrent;
            // ==============================
            // STEP 9: SAVE TO DB
            // ==============================
            try {

                if (!samePrice) {

                    await prisma.stockEvent.create({
                        data: {

                            symbol:
                                stock.symbol,

                            price:
                                stock.price,

                            change:
                                stock.change,

                            changePercent:
                                stock.changePercent,

                            eventType:
                                event?.type || null,

                            explanation:
                                explanation?.summary || null
                        }
                    });

                    console.log(
                        "✅ Event saved to DB"
                    );

                } else {

                    console.log(
                        "⏭️ Duplicate price skipped"
                    );
                }

            } catch (dbError) {

                console.log(
                    "⚠️ DB write failed:",
                    dbError.message
                );
            }

            // ==============================
            // FINAL RESPONSE
            // ==============================
            res.json({

                success: true,

                data:
                    stock,

                event:
                    event || null,

                news,

                explanation
            });

        } catch (error) {

            console.error(
                "❌ CONTROLLER ERROR:",
                error.message
            );

            res.status(500).json({

                success: false,

                message:
                    error.message,
            });
        }
    };

export const getHistory =
    async (req, res) => {

        try {

            // ==============================
            // SYMBOL QUERY
            // ==============================
            const {
                symbol
            } = req.query;

            // ==============================
            // HISTORY QUERY
            // ==============================
            const history =
                await prisma.stockEvent.findMany({

                    where:
                        symbol
                            ? {
                                symbol: {
                                    equals:
                                        symbol
                                            .trim()
                                            .toUpperCase()
                                }
                            }
                            : undefined,

                    orderBy: {
                        createdAt:
                            "desc"
                    },

                    take: 20
                });

            res.json({

                success: true,

                data:
                    history
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message
            });
        }
    };