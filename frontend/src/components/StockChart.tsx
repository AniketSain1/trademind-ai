import {
    memo,
    useMemo
} from "react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

type Props = {
    history: any[];
};

const StockChart = memo(
    function StockChart({
        history
    }: Props) {

        // ==============================
        // MEMOIZED CHART DATA
        // ==============================
        const {
            chartData,
            chartColor,
            isBullish
        } = useMemo(() => {

            // ==============================
            // FORMAT DATA
            // ==============================
            const chartData =
                [...history]
                    .reverse()
                    .slice(-12)
                    .map((item) => ({
                        time:
                            new Date(
                                item.createdAt
                            ).toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }
                            ),

                        price:
                            Number(
                                item.price
                            )
                    }));

            // ==============================
            // TREND COLOR
            // ==============================
            const firstPrice =
                chartData[0]?.price || 0;

            const lastPrice =
                chartData[
                    chartData.length - 1
                ]?.price || 0;

            const isBullish =
                lastPrice >= firstPrice;

            const chartColor =
                isBullish
                    ? "#10B981"
                    : "#EF4444";

            return {
                chartData,
                chartColor,
                isBullish
            };

        }, [history]);

        return (

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120] p-6 shadow-2xl">

                {/* BACKGROUND GLOW */}
                <div
                    className={`
                        absolute top-0 right-0
                        h-40 w-40 rounded-full
                        blur-3xl opacity-20
                        ${
                            isBullish
                                ? "bg-green-500"
                                : "bg-red-500"
                        }
                    `}
                />

                {/* HEADER */}
                <div className="relative z-10 mb-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                                Market Trend
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-white">
                                Live Price Chart
                            </h2>

                        </div>

                        <div
                            className={`
                                rounded-full border
                                px-4 py-2 text-sm font-semibold
                                ${
                                    isBullish
                                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                                        : "border-red-500/20 bg-red-500/10 text-red-400"
                                }
                            `}
                        >
                            {isBullish
                                ? "📈 Bullish Trend"
                                : "📉 Bearish Trend"}
                        </div>

                    </div>

                </div>

                {/* CHART */}
                <div className="relative z-10 h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={chartData}
                        >

                            {/* GRADIENT */}
                            <defs>

                                <linearGradient
                                    id="colorPrice"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="5%"
                                        stopColor={
                                            chartColor
                                        }
                                        stopOpacity={0.4}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor={
                                            chartColor
                                        }
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            {/* GRID */}
                            <CartesianGrid
                                stroke="#1E293B"
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            {/* X AXIS */}
                            <XAxis
                                dataKey="time"
                                stroke="#64748B"
                                tickLine={false}
                                axisLine={false}
                            />

                            {/* Y AXIS */}
                            <YAxis
                                stroke="#64748B"
                                tickLine={false}
                                axisLine={false}
                                domain={[
                                    "auto",
                                    "auto"
                                ]}
                            />

                            {/* TOOLTIP */}
                            <Tooltip
                                contentStyle={{
                                    background:
                                        "#020617",

                                    border:
                                        "1px solid #1E293B",

                                    borderRadius:
                                        "16px",

                                    color:
                                        "#fff",

                                    boxShadow:
                                        "0 10px 40px rgba(0,0,0,0.5)"
                                }}
                            />

                            {/* AREA */}
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke={chartColor}
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                                animationDuration={1000}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </div>
        );
    }
);

export default StockChart;