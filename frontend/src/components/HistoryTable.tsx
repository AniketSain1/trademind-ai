import type {
    HistoryItem
} from "../types/stock";

type Props = {
    history: HistoryItem[];
};

function HistoryTable({
    history
}: Props) {

    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#0B1120]
                shadow-2xl
            "
        >

            {/* HEADER */}
            <div className="border-b border-white/10 p-6">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-[0.3em]
                        text-cyan-400
                    "
                >
                    Monitoring Logs
                </p>

                <h2
                    className="
                        mt-2
                        text-3xl
                        font-black
                        text-white
                    "
                >
                    Event History
                </h2>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

                <table className="min-w-full">

                    {/* HEAD */}
                    <thead
                        className="
                            sticky
                            top-0
                            z-10
                            bg-slate-950
                        "
                    >

                        <tr
                            className="
                                border-b
                                border-white/10
                            "
                        >

                            {[
                                "Symbol",
                                "Price",
                                "Change",
                                "Change %",
                                "Event",
                                "Time"
                            ].map(
                                (item) => (
                                    <th
                                        key={item}
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-sm
                                            font-semibold
                                            uppercase
                                            tracking-wide
                                            text-slate-400
                                        "
                                    >
                                        {item}
                                    </th>
                                )
                            )}

                        </tr>

                    </thead>

                    {/* BODY */}
                    <tbody>

                        {history.map(
                            (
                                item
                            ) => {

                                const isPositive =
                                    item.change >= 0;

                                return (
                                    <tr
                                        key={item.id}
                                        className="
                                            border-b
                                            border-white/5
                                            transition-all
                                            duration-300
                                            hover:bg-white/5
                                        "
                                    >

                                        {/* SYMBOL */}
                                        <td
                                            className="
                                                px-6
                                                py-5
                                                font-bold
                                                text-white
                                            "
                                        >
                                            {item.symbol}
                                        </td>

                                        {/* PRICE */}
                                        <td
                                            className="
                                                px-6
                                                py-5
                                                text-slate-300
                                            "
                                        >
                                            ₹
                                            {Number(
                                                item.price
                                            ).toFixed(
                                                2
                                            )}
                                        </td>

                                        {/* CHANGE */}
                                        <td
                                            className={`
                                                px-6
                                                py-5
                                                font-semibold
                                                ${
                                                    isPositive
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }
                                            `}
                                        >
                                            {isPositive
                                                ? "+"
                                                : ""}
                                            {
                                                item.change
                                            }
                                        </td>

                                        {/* CHANGE % */}
                                        <td
                                            className={`
                                                px-6
                                                py-5
                                                font-semibold
                                                ${
                                                    item.changePercent.startsWith(
                                                        "-"
                                                    )
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                }
                                            `}
                                        >
                                            {
                                                item.changePercent
                                            }
                                        </td>

                                        {/* EVENT */}
                                        <td className="px-6 py-5">

                                            <span
                                                className={`
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-bold
                                                    ${
                                                        item.eventType === "SPIKE"
                                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                            : item.eventType === "DROP"
                                                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                                                : "bg-slate-500/10 text-slate-300 border border-slate-500/20"
                                                    }
                                                `}
                                            >
                                                {
                                                    item.eventType ||
                                                    "NORMAL"
                                                }
                                            </span>

                                        </td>

                                        {/* TIME */}
                                        <td
                                            className="
                                                px-6
                                                py-5
                                                text-slate-400
                                            "
                                        >
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleTimeString()}
                                        </td>

                                    </tr>
                                );
                            }
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default HistoryTable;