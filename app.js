const { Client, GatewayIntentBits } = require("discord.js");
const { REST, Routes } = require("discord.js");
const { token, id } = require("./token.json");
const { commands } = require("./app/commands/commands");
const onMessage = require("./app/messages/onMessage");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const rest = new REST({ version: "10" }).setToken(token);

try {
  console.log("Started refreshing application (/) commands.");
  rest.put(Routes.applicationCommands(id), { body: commands });
  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// 집회구역 복사
client.on("messageCreate", onMessage);

client.on("interactionCreate", async (interaction) => {
  /** 집회구역 복사 */
  if (interaction.isButton()) {
    await interaction.reply("복사되었습니다.");
    await interaction.deleteReply();
  }
  /** 슬레시 커멘드 입력 */
  if (interaction.isCommand()) {
    //등록한 명령어를 찾아서
    const currentCommand = commands.find(
      ({ name }) => name === interaction.commandName
    );
    if (currentCommand) {
      await interaction.deferReply();
      //실행해준다.
      currentCommand.execute(client, interaction);
      console.log(`info: command ${currentCommand.name} handled correctly`);
    }
  }
});

client.login(token);
