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
      [{ text: "🔘 Start Knowledge Missions 📘", web_app: { url: "https://sagugame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow on X 🐦", url: "https://x.com/SAGE_officialX" }],
      [{ text: "🔘 Join Telegram Chat 💬", url: "https://t.me/Official_SAGU_TG" }],
    ],
  };

  const message = `
🧠 Welcome to SageUnion! 📘🤖
You've entered the future of knowledge — where your insights are evaluated by AI and rewarded transparently.

🌟 What you can do here:
📝 Answer weekly knowledge questions
🤖 Let AI evaluate the quality of your answers
💰 Earn SAGU tokens for high-quality contributions
🏆 Climb the community leaderboard and shape the future of decentralized knowledge

🚀 Ready to contribute? Tap a button below and start exploring!
  `;

  const pngUrl = 'https://sagubot.vercel.app/sagupic.png';  // public 폴더에 있는 이미지 파일 경로

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

