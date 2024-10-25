import type { RichPost, RoarBot } from "@mbw/roarbot";

export default async (bot: RoarBot) => {
  const posts: RichPost[] = [];

  bot.on("post", (_, post) => {
    if (post.username === bot.username) {
      posts.push(post);
    }
  });
  bot.command("clean", {
    description: "Removes the most recent post.",
    admin: true,
    args: [],
    fn: async () => {
      await posts.pop()?.delete();
    },
  });
};
