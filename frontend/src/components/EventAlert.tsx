type Props = {
  event: any;
};

function EventAlert({
  event,
}: Props) {

  // ==============================
  // NORMAL EVENT
  // ==============================
  if (
    event.type === "NORMAL"
  ) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        border
        border-slate-700
        bg-slate-800/40
        p-6
        text-center
        "
      >
        <p
          className="
          text-slate-300
          font-semibold
          text-lg
          "
        >
          Market Stable
        </p>

        <p
          className="
          text-slate-500
          text-sm
          mt-2
          "
        >
          Change:
          {" "}
          {event.changePercent}%
        </p>
      </div>
    );
  }

  // ==============================
  // COLORS
  // ==============================
  const isBullish =
    event.type.includes(
      "BULLISH"
    );

  const isBearish =
    event.type.includes(
      "BEARISH"
    );

  const bgColor =
    isBullish
      ? "bg-emerald-500/20 border-emerald-500/30"
      : isBearish
      ? "bg-red-500/20 border-red-500/30"
      : "bg-yellow-500/20 border-yellow-500/30";

  const textColor =
    isBullish
      ? "text-emerald-400"
      : isBearish
      ? "text-red-400"
      : "text-yellow-300";

  return (
    <div
      className={`
      mt-6
      rounded-2xl
      border
      p-6
      text-center
      ${bgColor}
      `}
    >
      <h3
        className={`
        text-2xl
        font-bold
        ${textColor}
        `}
      >
        🚨 {event.type}
      </h3>

      <p
        className="
        mt-2
        text-slate-300
        "
      >
        Signal:
        {" "}
        {event.signal}
      </p>

      <p
        className="
        mt-2
        text-slate-400
        "
      >
        Strength:
        {" "}
        {event.strength}
      </p>

      <p
        className="
        mt-2
        text-slate-400
        "
      >
        Change:
        {" "}
        {event.changePercent}%
      </p>
    </div>
  );
}

export default EventAlert;