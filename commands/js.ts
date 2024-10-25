import type { RoarBot } from "@mbw/roarbot";

export default (bot: RoarBot) => {
  bot.command("js", {
    description: "Executes JS.",
    admin: true,
    args: ["full"],
    fn: async (reply, [code]) => {
      const resp = eval(code);
      await reply(
        resp === null ? "<null>"
        : resp === undefined ? "<undefined>"
        : typeof resp === "string" ? JSON.stringify(resp)
        : String(resp),
      );
    },
  });
};
