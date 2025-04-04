require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "Start Food Missions 🍜", web_app: { url: "https://pdggame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "Follow on X 🐦", url: "https://x.com/PDG_official_X" }],
      [{ text: "Join Telegram Chat 💬", url: "https://t.me/PDG_Offcial" }],
    ],
  };

  const message = `
🚀 Welcome to ProdigiConnect! 🍽🎮
The world of food, rewards, and blockchain awaits you! 🌍🍜
You’ve just entered ProdigiConnect, where you can discover global food hotspots, complete GameFi-powered food missions, and earn PDG tokens!

🔥 What you can do here:
🍽 Check-in at restaurants & unlock rewards
🎮 Complete mini-game missions & earn PDG tokens
📝 Write food reviews & climb the leaderboard

🚀 Your journey begins now! Tap below to start exploring!
  `;

  const pngUrl = 'https://pdgbot.vercel.app/pdgpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

