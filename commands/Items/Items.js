const { getItems } = require("./ItemsFatch");
const ItemList = require("./itemList.json");
const { suggestCorrection } = require("../../utils/suggestCorrection");

const Items = () => async (_, interaction) => {
  const command = interaction.options.get("소재")?.value || "";

  const item = suggestCorrection(command, ItemList);

  let Embed = [];
  if (item.length === 0) {
    Embed.push({
      color: 0x0099ff,
      fields: [
        {
          name: command,
          value: "올바른 아이템 이름을 입력해주세요",
        },
      ],
    });
  } else {
    Embed = await getItems(item[0]);
  }

  await interaction.editReply({
    ephemeral: true,
    embeds: Embed,
  });
};

module.exports = {
  Items: Items,
};
