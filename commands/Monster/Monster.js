const MonsterFatch = require("./MonsterFatch")

const Monster = async (_, interaction) => {
  const command = interaction.options.get("몬스터")?.value || "";
  MonsterFatch;
  let Embed

  if (item.length === 0) {
    Embed.push({
      color: 0x0099ff,
      fields: [
        {
          name: command,
          value: "올바른 이름을 입력해주세요",
        },
      ],
    });
  } else {


  }

  await interaction.editReply({
    ephemeral: true,
    embeds: Embed,
  });
};

module.exports = {
  Monster: Monster,
};