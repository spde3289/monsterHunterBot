const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const getData = require("../app/fatch/getData");

const monsterFatch = async () => {
  const HTML = await getData("https://mhf.inven.co.kr/dataninfo/mhw/monster/");
  let $ = cheerio.load(HTML.data);
  let $trs = $(".list").find("table > tbody > tr");
  const json = [];

  $trs.each((_, tr) => {
    let name = $(tr).find("td.name > a > b").text();
    let link = $(tr).find("td.name > a").attr("href");

    json.push({
      name,
      link,
    });
  });
  console.log(json);

  const stringJson = JSON.stringify(json);
  fs.writeFileSync("monsterInfo.json", stringJson);
};

monsterFatch();
