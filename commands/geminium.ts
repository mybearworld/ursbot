import type { RoarBot } from "jsr:@mbw/roarbot";

export default (bot: RoarBot) => {
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
};
