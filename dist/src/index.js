"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDbConnection = checkDbConnection;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../config/redis");
const databaseConnection_1 = require("../config/databaseConnection");
const webhookroute_1 = __importDefault(require("../src//routes/webhookroute"));
const productRoute_1 = __importDefault(require("../src/routes/productRoute"));
dotenv_1.default.config({
    path: "./.env",
});
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.send("Hey server is up and running 1");
});
async function checkDbConnection() {
    try {
        const connection = await databaseConnection_1.db.getConnection();
        await connection.ping();
        connection.release();
        console.log("✅ MySQL connected successfully");
    }
    catch (error) {
        console.error("❌ MySQL connection failed:", error);
        process.exit(1);
    }
}
async function startServer() {
    await checkDbConnection();
    await redis_1.redis.connect();
    app.listen(PORT, () => {
        console.log(`Server is up and running at ${PORT}`);
    });
}
// using the application routes
app.use("/webhook", webhookroute_1.default);
app.use("/products", productRoute_1.default);
startServer();
