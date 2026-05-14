import dotenv from "dotenv";

// LOAD ENV VARIABLES
dotenv.config();

import app from "./app.js";

const PORT = 5001;


// START SERVER
app.listen(PORT, () => {
    console.log(
        `✅ Server running on port ${PORT}`
    );
});