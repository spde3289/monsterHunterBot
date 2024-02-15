const { Client, GatewayIntentBits } = require("discord.js");
const { REST, Routes } = require("discord.js");
const { token, id } = require("./token.json");
const { commands } = require("./commands/commands");
const onMessage = require("./messages/onMessage");

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
  // if (!interaction.isChatInputCommand()) return;

  /** 집회구역 복사 */
  if (interaction.isButton()) {
    // 클립보드에 메시지 내용을 복사합니다.
    // navigator.clipboard.write(interaction.customId);
    // clipboard.write(interaction.customId);
    // clipboard.read();
    // console.log(clipboard.readSync("d"))
    //clipboard.clipboard.writeText(interaction.customId);
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
