import type { RoarBot } from "@mbw/roarbot";

const round = (n: number) => Math.floor(n * 100) / 100;

const UNITS: [RegExp, (unit: number) => string][] = [
  [/^°?C$/, (c) => `${round(c * (9 / 5) + 32)}°F`],
  [/^°?F$/, (f) => `${round((f - 32) * (5 / 9))}°C`],
  [/^(?:cm|centim(?:et(?:re|er)s?)?)$/, (m) => `${round(m / 2.54)}in`],
  [/^(?:m(?:et(?:re|er)s?)?)$/, (m) => `${round(m * 3.281)}ft`],
  [/^(?:km|kilom(?:et(?:re|er)s?)?)$/, (k) => `${round(k / 1.609)}mi`],
  [/^(?:in|inch(?:es)?)$/, (i) => `${round(i * 2.54)}cm`],
  [/^(?:ft|feet|foot)$/, (f) => `${round(f / 3.281)}m`],
  [/^mi(?:les?)?$/, (m) => `${round(m * 1.609)}km`],
  [/^(?:kg|kilograms?)$/, (k) => `${round(k * 2.20462)}lbs`],
  [/^(?:g(?:rams?)?)$/, (g) => `${round(g / 28.3495)}oz`],
  [/^(?:lbs|pounds?)$/, (l) => `${round(l / 2.20462)}kg`],
  [/^(?:oz|ounces?)$/, (o) => `${round(o * 28.3495)}g`],
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
        /(-?\d+(?:.\d+)?|an?) ?(\S+)/g,
        (s, num, unit) => {
          const number = Number(num);
          for (const [re, convert] of UNITS) {
            if (re.test(unit)) {
              return convert(Number.isNaN(number) ? 1 : number);
            }
          }
          return s;
        },
      );
      if (replaced === toConvert.content) {
        await reply("Found no units to convert.");
        return;
      }
      await reply(
        `Sure! That is:\n${replaced.replace(/^/gm, "> ")}\n>\n> \\- @${toConvert.username}`,
      );
    },
  });
};
