"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
// EXTERNAL API RETRY LOGIC 
async function retry(fn, retries = 3, delay = 200) {
    try {
        return await fn();
    }
    catch (err) {
        if (retries === 0)
            throw err;
        await new Promise(r => setTimeout(r, delay));
        return retry(fn, retries - 1, delay * 2);
    }
}
