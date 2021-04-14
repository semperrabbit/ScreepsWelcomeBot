import { Botkit } from "botkit";

module.exports = function (controller: Botkit) {
  controller.on("direct_message", async (bot, message) => {
    await bot.reply(message, "I heard a private message");
  });
};
