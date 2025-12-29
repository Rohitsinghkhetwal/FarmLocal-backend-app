"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const product_service_1 = require("../../products/product.service");
const product_cache_1 = require("../../products/product.cache");
const products = async (req, res) => {
    try {
        console.log("this is req query ", req.query);
        const key = `products:${JSON.stringify(req.query)}`;
        const cached = await (0, product_cache_1.getCachedProducts)(key);
        if (cached)
            return res.json(cached);
        const data = await (0, product_service_1.getProducts)(req.query);
        await (0, product_cache_1.setCachedProducts)(key, data);
        return res.json(data);
    }
    catch (err) {
        return res.status(400).json({ error: "Something went wrong !" });
    }
};
exports.products = products;
