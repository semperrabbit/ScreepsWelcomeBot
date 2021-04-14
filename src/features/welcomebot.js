module.exports = function (controller) {
  // use a function to match a condition in the message
  controller.on(
    async (message) => message.text && message.text.toLowerCase() === "foo",
    ["message"],
    async (bot, message) => {
      await bot.reply(message, 'I heard "foo" via a function test');
    }
  );
};
