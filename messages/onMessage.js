const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const onMessage = async (message) => {
  if (message.author.bot) return;

  // 집회구역번호 복사
  if (message.channelId === "1199270157906874388") {
    if (message.content.length != 0) {
      const copy = new ButtonBuilder()
        .setCustomId(message.content)
        .setLabel(message.content)
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder().addComponents(copy);
      await message.reply({
        components: [row],
      });
    }
  }

  // 테스트
  if (message.channelId === "1151818956772999198") {
    if (message.content.length != 0) {
      const copy = new ButtonBuilder()
        .setCustomId(message.content)
        .setLabel(message.content)
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder().addComponents(copy);
      await message.reply({
        components: [row],
      });
    }
  }
};

module.exports = onMessage;
