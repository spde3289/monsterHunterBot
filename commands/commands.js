const { ApplicationCommandOptionType } = require("discord.js");
const { test } = require("./test/test")
const { Items } = require("./Items/Items")

const commands = [
  {
    name: "test",
    description: "test",
    options: [
      {
        required: true,
        name: "안녕",
        description: "테스트",
        type: ApplicationCommandOptionType.String,
      },
    ],
    execute: test(),
  },
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
