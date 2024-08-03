import type { RoarBot } from "@mbw/roarbot";

export default (bot: RoarBot) => {
  bot.command("whois", {
    args: [{ name: "username", type: "string", optional: true }],
    description: "Get information about a user.",
    fn: async (reply, [user], post) => {
      const profile = await bot.user(user ?? post.u);
      reply(`
### ${profile._id}
**Created**: ${profile.created ? new Date(profile.created * 1000) : "idk"}
**Last logged in**: ${
        profile.last_seen ? new Date(profile.last_seen * 1000) : "idk"
      }
**Quote**:
${profile.quote?.replace(/^/gm, "> ")}
`);
    },
  });
};
