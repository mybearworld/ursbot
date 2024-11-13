import type { RoarBot } from "@mbw/roarbot";

export default (bot: RoarBot) => {
  bot.command("ismeowerdownyet", {
    description: "check if meower is bad yet",
    args: [],
    fn: async (reply) => {
      // // TODO: Fix logic
      // if (bot.isMeowerDown()) {
      //   await reply("yes");
      // } else {
      await reply("no <:uggh:1227845267496243242>");
      // }
    },
  });
};
