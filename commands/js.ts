import type { RoarBot } from "@mbw/roarbot";

export default (bot: RoarBot) => {
  bot.command("js", {
    description: "Executes JS.",
    admin: true,
    args: ["full"],
    fn: async (reply, [code]) => {
      const resp = new Function(code).call({ bot });
      if (resp === undefined) {
        return;
      }
      await reply(
        resp === null ? "<null>"
        : typeof resp === "string" ? JSON.stringify(resp)
        : String(resp),
      );
    },
  });
};
