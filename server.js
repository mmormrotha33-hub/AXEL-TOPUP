require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// ===============================
// TELEGRAM
// ===============================
async function sendTelegram(message) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error("Telegram environment variables are missing");
    }

    const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }
    );

    const data = await response.json();

    if (!data.ok) {
        throw new Error(data.description || "Telegram API error");
    }

    return data;
}

// ===============================
// ORDER API
// ===============================
app.post("/api/order", async (req, res) => {
    try {
        const {
            game,
            userId,
            packageName,
            price,
            coupon,
            payment
        } = req.body;

        // Check required data
        if (!game || !userId || !packageName || !price) {
            return res.status(400).json({
                success: false,
                message: "Missing order information"
            });
        }

        // Check Player ID
        if (!/^[0-9]+$/.test(String(userId))) {
            return res.status(400).json({
                success: false,
                message: "Invalid Player ID"
            });
        }

        // Telegram message
        const message = `
🔥 NEW ORDER - NAVIN STORE

🎮 Game: ${game}
🆔 Player ID: ${userId}
💎 Package: ${packageName}
💵 Price: $${Number(price).toFixed(2)}
🎟 Coupon: ${coupon || "NONE"}
💳 Payment: ${payment || "KHQR"}

⏰ Status: Waiting Payment
`;

        // Send to Telegram
        await sendTelegram(message);

        // Success
        res.json({
            success: true,
            message: "Order sent successfully"
        });

    } catch (error) {

        console.error("ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log("=================================");
    console.log("🔥 NAVIN STORE SERVER");
    console.log(`🌐 http://localhost:${3000}`);
    console.log("=================================");
});