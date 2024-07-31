import { RoarBot } from "jsr:@mbw/roarbot";
import "jsr:@std/dotenv/load";

const username = Deno.env.get("BOT_USERNAME");
const password = Deno.env.get("BOT_PASSWORD");
if (!username || !password) {
  throw new Error("Specify BOT_USERNAME and BOT_PASSWORD in the .env");
}

const bot = new RoarBot();
bot.login(username, password);
