# AXEL STORE

Free Fire Top Up website. When a customer clicks "ទិញឥឡូវនេះ", the website sends the order to your Telegram bot through the server.

## 1. Install Node.js

Install Node.js on your PC.

## 2. Install packages

Open Terminal inside this folder:

npm install

## 3. Create .env

Copy `.env.example` to `.env` and put your Telegram Bot Token and Chat ID:

TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
PORT=3000

DO NOT put the bot token inside index.html.

## 4. Start

npm start

Open:

http://localhost:3000

## 5. Images

Put these files in the same folder if you want your own images:

- banner.jpg
- download.jpeg
- qr.png

The site still works if the images are missing.

## Telegram

Create a bot with BotFather, then add the bot to the chat where you want order notifications. The bot must be allowed to send messages there.

For a private chat, send at least one message to the bot first.

## Important

The Telegram message confirms that an order was submitted. It does NOT automatically verify a KHQR payment. Payment verification should be added separately before automatically delivering diamonds.
