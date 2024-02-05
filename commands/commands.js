const { ApplicationCommandOptionType } = require("discord.js");
const { Items } = require("./Items/Items");
const { Monster } = require("./Monster/Monster")
const ItemList = require("./Items/itemList.json");


const commands = [
  {
    name: "소재",
    description: "소재를 검색해보세요",
    options: [
      {
        required: true,
        name: "소재",
        description: "소재를 입력해주세요",
        type: ApplicationCommandOptionType.String,
        /* choices: dateList, */
      },
    ],
    execute: Items(),
  },
  {
    name: "몬스터",
    description: "몬스터에 대한 정보를 알려줘요",
    options: [
      {
        required: true,
        name: "몬스터",
        description: "몬스터 이름을 입력해주세요",
        type: ApplicationCommandOptionType.String,
        /* choices: dateList, */
      },
    ],
    execute: Items(),
  },
];

module.exports = {
  commands,
};
