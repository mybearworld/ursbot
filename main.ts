import { RoarBot } from "@mbw/roarbot";
import "jsr:@std/dotenv/load";

const username = Deno.env.get("BOT_USERNAME");
const password = Deno.env.get("BOT_PASSWORD");
const admins = Deno.env.get("BOT_ADMINS")?.split(",");
if (!username || !password || !admins) {
  throw new Error(
    "Specify BOT_USERNAME and BOT_PASSWORD and BOT_ADMINS in the .env"
  );
}

const bot = new RoarBot({ admins, banned: ["yadayadayadagoodbye"] });
bot.run(
  import("./commands/convert.ts"),
  import("./commands/geminium.ts"),
  import("./commands/nova.ts"),
  import("./commands/js.ts"),
  import("./commands/symbolrace.ts"),
  import("./commands/whois.ts")
);
bot.login(username, password);
