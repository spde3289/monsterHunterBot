const onMessage = async (message) => {
  if (message.author.bot) return;

  // 집회구역번호 복사
  if (message.channelId === "1199270157906874388") {
    if (message.content.length != 0) {
      let Embed = {
        fields: [
          {
            name: "집회구역 복사",
            value: `\`\`\`${message.content}\`\`\``,
          },
        ],
      };
      await message.reply({
        ephemeral: true,
        embeds: [Embed],
      });
    }
  }

  // 테스트
  if (message.channelId === "1151818956772999198") {
    if (message.content.length != 0) {
      let Embed = {
        fields: [
          {
            name: "집회구역 복사",
            value: `\`\`\`${message.content}\`\`\``,
          },
        ],
      };

      await message.reply({
        ephemeral: true,
        embeds: [Embed],
      });
    }
  }
};

module.exports = onMessage;
