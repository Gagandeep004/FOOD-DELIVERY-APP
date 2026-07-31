import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server Running On Port ${PORT}`);
    });
}

export default app;