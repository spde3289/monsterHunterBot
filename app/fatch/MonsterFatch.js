const cheerio = require("cheerio");
const getData = require("./fatch");

const monsterFatch = async (link) => {
  const monsterHTML = await getData(
    `https://mhf.inven.co.kr/dataninfo/mhw/monster/${link}`
  );
  const $ = cheerio.load(monsterHTML.data);
  const $img = $(".monster_detail_wrap > img").attr("src");

  return $img;
};

module.exports = monsterFatch;
