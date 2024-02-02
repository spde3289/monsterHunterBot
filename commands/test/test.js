const test = () => async (_, interaction) => {
  const aaa = interaction.options.get("안녕")?.value || "";

  let Embed = {
    color: 0x0099ff,
    author: {
      name: aaa,
    }
  };

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed],
  });
};

module.exports = {
  test: test,
};
