const monsterList = require("./monsterInfo.json");
const MonsterFatch = require("./MonsterFatch");
const { suggestCorrection } = require("../../utils/suggestCorrection");

const Monster = () => async (_, interaction) => {
  const command = interaction.options.get("몬스터")?.value || "";
  let Embed = [];

  const currentMonster = suggestCorrection(command, monsterList);

  if (currentMonster.length === 0) {
    Embed.push({
      color: 0x1ac89b,
      fields: [
        {
          name: command,
          value: "올바른 이름을 입력해주세요",
        },
      ],
    });
  } else {
    const img = await MonsterFatch(currentMonster[0].link);
    Embed.push({
      color: 0x1ac89b,
      image: {
        url: img,
      },
    });
  }

  await interaction.editReply({
    ephemeral: true,
    embeds: Embed,
  });
};

module.exports = {
  Monster: Monster,
};
