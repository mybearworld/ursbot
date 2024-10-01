import type { RoarBot } from "@mbw/roarbot";

const UNITS: [RegExp, (unit: number) => string][] = [
  [/°?C/, (c) => `${c * (9 / 5) + 32}°F`],
  [/°?F/, (f) => `${(f - 32) * (5 / 9)}°C`],
];

export default (bot: RoarBot) => {
  bot.command("convert", {
    description: `Reply to a post with "@${bot.username} convert" to convert the units in that post! (Supported: °C <-> °F)`,
    args: [],
    fn: async (reply, _, post) => {
      const [toConvert] = post.replyTo;
      if (!toConvert) {
        await reply("Reply to a post to use this command!");
        return;
      }
      const replaced = toConvert.content.replace(
        /(-?\d+(?:.\d+)?) ?(\S+)/g,
        (s, num, unit) => {
          const number = Number(num);
          for (const [re, convert] of UNITS) {
            if (re.test(unit)) {
              return convert(number);
            }
          }
          return s;
        },
      );
      if (replaced === toConvert.content) {
        await reply("Found no units to convert.");
        return;
      }
      await reply(`Sure! That is:\n${replaced.replace(/^/gm, "> ")}`);
    },
  });
};
