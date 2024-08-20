import type { RoarBot } from "@mbw/roarbot";

const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_{|}~";
const generateSymbols = () =>
  Array.from({ length: 12 })
    .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
    .join("");

export default (bot: RoarBot) => {
  let race: string | undefined = undefined;

  bot.command("sr", {
    description: "Starts a symbol race! Who can type symbols the fastest?",
    args: [{ name: "symbols", type: "string", optional: true }],
    fn: async (reply, [symbols]) => {
      if (race) {
        if (!symbols) {
          await reply("A race is already running!");
          return;
        }
        if (symbols === race) {
          await reply("You win, congrats! <:yuhhuh:1227268820213698611>");
          race = undefined;
        } else if (symbols.replace(/\u200c/g, "") === race) {
          await reply("cheater <:mikeisgettingsickofyou:1143348848085962855>");
        } else {
          await reply("Nope, that's not it! <:nuhhuh:1233290735999258664>");
        }
        return;
      }
      if (symbols) {
        await reply("There's no race, so you can't type symbols yet.");
        return;
      }
      const randomSymbols = generateSymbols();
      race = randomSymbols;
      await reply(
        "Alright! Who can type these the fastest?\n`@BearBot sr " +
          randomSymbols.replace(/./g, (s) => `${s}\u200c`) +
          "`",
      );
    },
  });
};
