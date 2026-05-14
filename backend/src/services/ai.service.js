import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey:
        process.env.GROQ_API_KEY,
});

export const generateExplanation =
    async ({
        symbol,
        priceData,
        event,
        news,
    }) => {

        try {

            // ==============================
            // NO EVENT
            // ==============================
            if (!event) {

                return {
                    summary:
                        "No significant market event detected.",

                    sentiment:
                        "Neutral",

                    confidence:
                        70,

                    risk:
                        "Low",

                    signal:
                        "Hold",
                };
            }

            // ==============================
            // NEWS HEADLINES
            // ==============================
            const headlines =
                news
                    ?.map(
                        (item) =>
                            `- ${item.title}`
                    )
                    .join("\n");

            // ==============================
            // AI PROMPT
            // ==============================
            const prompt =
                `
You are a professional stock market AI analyst.

Analyze this stock movement.

Symbol:
${symbol}

Price:
${priceData.price}

Change:
${priceData.change}

Change Percent:
${priceData.changePercent}

Event:
${event.type}

News:
${headlines}

Return ONLY valid JSON in this exact structure:

{
  "summary": "...",
  "sentiment": "Bullish or Bearish or Neutral",
  "confidence": number,
  "risk": "Low or Medium or High",
  "signal": "Buy or Sell or Hold"
}
`;

            // ==============================
            // AI REQUEST
            // ==============================
            const response =
                await groq.chat.completions.create({
                    model:
                        "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role:
                                "user",

                            content:
                                prompt,
                        },
                    ],

                    temperature:
                        0.3,
                });

            // ==============================
            // RAW CONTENT
            // ==============================
            const content =
                response
                    .choices?.[0]
                    ?.message
                    ?.content;

            // ==============================
            // PARSE JSON
            // ==============================
            const parsed =
                JSON.parse(content);

            return parsed;

        } catch (error) {

            console.log(
                "AI ERROR:",
                error.message
            );

            return {
                summary:
                    "AI analysis unavailable.",

                sentiment:
                    "Neutral",

                confidence:
                    50,

                risk:
                    "Low",

                signal:
                    "Hold",
            };
        }
    };