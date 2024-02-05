const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const getMonstersHtml = async () => {
  try {
    return await axios.get("https://mhf.inven.co.kr/dataninfo/mhw/monster/");
  } catch (error) {
    console.log(error);
  }
};

const MonsterFatch = async () => {
  const HTML = await getMonstersHtml();
  let $ = cheerio.load(HTML.data);
  let $trs = $(".list").find("table > tbody > tr");
  const json = []

  $trs.each((_, tr) => {
    let name = $(tr).find("td.name > a > b").text();
    let link = $(tr).find("td.name > a").attr("href");

    console.log(name);
    console.log(link);
    json.push({
      name,
      link
    })
    
  });
  console.log(json)

  const stringJson = JSON.stringify(json);
  fs.writeFileSync("monsterInfo.json", stringJson);

  // return json;
};

MonsterFatch();
