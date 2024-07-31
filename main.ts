import { RoarBot } from "jsr:@mbw/roarbot";
import "jsr:@std/dotenv/load";

const username = Deno.env.get("BOT_USERNAME");
const password = Deno.env.get("BOT_PASSWORD");
if (!username || !password) {
  throw new Error("Specify BOT_USERNAME and BOT_PASSWORD in the .env");
}

const bot = new RoarBot();
bot.command("ask", {
  description: "Ask Geminium something!",
  args: [{ name: "query", type: "full" }],
  fn: async (reply, [query]) => {
    reply("Hmm...");
    const response = await fetch(
      "https://geminium.joshatticus.online/api/geminium/ask",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      }
    );
    if (response.status !== 200) {
      reply(`Something went wrong! ${response.status}`);
      return;
    }
    reply(await response.text());
  },
});
bot.login(username, password);
