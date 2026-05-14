import axios from "axios";

// ======================================
// USD TO INR
// ======================================
export const convertUsdToInr =
    async (amount) => {

        try {

            const url =
                "https://open.er-api.com/v6/latest/USD";

            const response =
                await axios.get(url);

            const rate =
                response.data
                    .rates
                    .INR;

            console.log(
                "💱 USD/INR RATE:",
                rate
            );

            return amount * rate;

        } catch (error) {

            console.log(
                "⚠️ Currency conversion failed"
            );

            return amount;
        }
    };