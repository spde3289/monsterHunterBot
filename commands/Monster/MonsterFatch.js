const cheerio = require("cheerio");
const axios = require("axios");

const getMonstersHtml = async (link) => {
  try {
    return await axios.get(
      `https://mhf.inven.co.kr/dataninfo/mhw/monster/${link}`
    );
  } catch (error) {
    console.log(error);
  }
};

const MonsterFatch = async (link) => {
  const monsterHTML = await getMonstersHtml(link);
  const $ = cheerio.load(monsterHTML.data);
  const $img = $(".monster_detail_wrap > img").attr("src");

  return $img;
};

module.exports = MonsterFatch;
