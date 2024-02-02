const { ApplicationCommandOptionType } = require("discord.js");
const { Items } = require("./Items/Items");

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
      },
    ],
    execute: Items(),
  },
];

module.exports = {
  commands,
};
