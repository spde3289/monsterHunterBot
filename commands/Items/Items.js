const { getItems } = require("./ItemsFatch");
const ItemList = require("./ItemList.json");

const Items = () => async (_, interaction) => {
  const currentItems = interaction.options.get("소재")?.value || "";
  const item = ItemList.filter((el) => {
    el.name === currentItems
  });

  let Embed;

  if (item.length === 0) {
    Embed = {
      color: 0x0099ff,
      fields: [
        {
          name: currentItems,
          value: "올바른 이름을 입력해주세요",
        },
      ],
    };
  } else {
    const itemNumber = item[0].itemNumber.split("/");
    const number = itemNumber[itemNumber.length - 1].split(".")[0];
    const data = await getItems(number);
    Embed = {
      color: 0x0099ff,
      fields: data,
    };
  }

  await interaction.editReply({
    ephemeral: true,
    embeds: [Embed],
  });
};

module.exports = {
  Items: Items,
};
