"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookApi = void 0;
const redis_1 = require("../config/redis");
// import { retry } from "../utils/retry";
const webhookApi = async (req, res) => {
    try {
        const eventId = req.headers["x-event-id"];
        if (!eventId)
            return res.status(400).send("Missing event id");
        const exists = await redis_1.redis.get(`webhook:${eventId}`);
        if (exists) {
            return res.status(200).send("Duplicate ignored");
        }
        await redis_1.redis.set(`webhook:${eventId}`, "1", {
            EX: 86400, //24 hours
        });
        console.log("Webhook event processed", req.body);
        return res.status(200).send("OK");
    }
    catch (err) {
        console.log("error", err);
        return res.status(400).json({ error: "Something went error webhook access " });
    }
};
exports.webhookApi = webhookApi;
