import type { RoarBot } from "@mbw/roarbot";

const celsiusToFahrenheit = (c: number) => c * (9 / 5) + 32;
const fahrenheitToCelsius = (f: number) => (f - 32) * (5 / 9);

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
        /(-?\d+(?:.\d+)?)°?(C|F)/g,
        (_, num, unit) => {
          const number = Number(num);
          return unit === "C" ?
              `${celsiusToFahrenheit(number)}°F`
            : `${fahrenheitToCelsius(number)}°C`;
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
