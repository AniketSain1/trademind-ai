type TickerItem = {
    symbol: string;
    price: number;
    changePercent: string;
};

type Props = {
    data: TickerItem[];
};

function MarketTicker({
    data
}: Props) {

    return (
        <div
            className="
                relative
                overflow-hidden
                border-b
                border-white/10
                bg-black/30
                backdrop-blur-xl
            "
        >

            {/* SCROLL CONTAINER */}
            <div
                className="
                    flex
                    animate-ticker
                    whitespace-nowrap
                    py-3
                "
            >

                {[...data, ...data].map(
                    (
                        item,
                        index
                    ) => {

                        const isPositive =
                            item.changePercent.startsWith(
                                "+"
                            ) ||
                            !item.changePercent.startsWith(
                                "-"
                            );

                        return (
                            <div
                                key={index}
                                className="
                                    mx-8
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                {/* SYMBOL */}
                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-white
                                    "
                                >
                                    {item.symbol}
                                </span>

                                {/* PRICE */}
                                <span
                                    className="
                                        text-sm
                                        text-slate-300
                                    "
                                >
                                    ₹
                                    {item.price.toFixed(
                                        2
                                    )}
                                </span>

                                {/* CHANGE */}
                                <span
                                    className={`
                                        text-sm
                                        font-semibold
                                        ${
                                            isPositive
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    `}
                                >
                                    {item.changePercent}
                                </span>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}

export default MarketTicker;