import type { RoarBot } from "@mbw/roarbot";
import { z } from "zod";

const resultSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
  favicon_id: z.string().nullable(),
});
type Result = z.infer<typeof resultSchema>;
const resultToMD = (result: Result) => {
  const title =
    "> [" +
    result.title.replace(/\]/g, "\\]").replace(/\n/g, " ") +
    "](" +
    result.url.replace(/\)/g, "\\)").replace(/\n/g, " ") +
    ")";
  const description = result.description
    ? "> _" + result.description.replace(/_/g, "\\_") + "_"
    : "";
  return title + "\n" + description;
};

const searchSchema = resultSchema.array();

export default (bot: RoarBot) => {
  bot.command("nova", {
    description:
      "Do a search through [novasearch.xyz](https://novasearch.xyz).",
    args: ["full"],
    fn: async (reply, [msg]) => {
      const response = await fetch(
        `https://api.novasearch.xyz/search?query=${encodeURIComponent(msg)}`
      );
      if (!response.ok) {
        if (response.status === 410) {
          await reply("No results, sorry!");
          return;
        }
        await reply(`Got ${response.status} from the API`);
        return;
      }
      const search = searchSchema.parse(await response.json());
      await reply(
        `**Results 1-${Math.min(10, search.length)} of ${search.length}:**\n` +
          search.slice(0, 10).map(resultToMD).join("\n\n")
      );
    },
  });
};
