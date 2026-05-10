import express from "express";
import { connectDB } from "./config/db";
import orderR from "./routers/orderRouter";
import logger from "./utils/Logger";
import itemR from "./routers/itemRouter";
import supplierR from "./routers/supplierRouter";
import analyticsR from "./routers/analyticsRouter";
import cors from "cors";
import { PORT } from "./config/env";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
    logger.info("Incoming request", { method: req.method, url: req.url, IP: req.ip });
    next();
});

app.use("/api/orders", orderR);

app.use("/api/items", itemR);

app.use("/api/suppliers", supplierR);

app.use("/api/analytics", analyticsR);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
