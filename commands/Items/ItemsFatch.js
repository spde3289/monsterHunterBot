const cheerio = require("cheerio");
const getData = require("../../fatch/getData");

const GuidingLands = [
  //인도하는 땅
  "Guiding Lands (High)",
  "Guiding Lands (Mid)",
  "	Guiding Lands (Low)",
];

const InvestigationReward = [
  // 조사 보상
  "Investigation Reward (Silver)",
  "Investigation Reward (Gold)",
  "Investigation Reward (Bronze)",
];

const parsing = async (item) => {
  let itemsHTML = await getData(item.href);
  
  let $ = cheerio.load(itemsHTML.data);
  let $divs = $(".table-responsive:nth(0)");

  let Embed = [
    {
      title: `[ ${item.name} ]`,
      url: item.href,
      color: 0x0099ff,
    },
  ];

  $divs.each((_, div) => {
    let tbodys = $(div).find("table > tbody");
    $(tbodys).each((idx, tbody) => {
      let tr = $(tbody).find("tr");
      let fields = [];
      $(tr).each((_, tds) => {
        let rank; // 랭크
        let name; // 이름
        let place; // 위치

        let probability; // 확률
        if (idx === 0) { // 사냥
          rank = $(tds).find("td:nth(0)").text(); // 랭크
          name = $(tds).find("td:nth(1)").text(); // 이름
          place = $(tds).find("td:nth(2)").text(); // 위치
          probability = $(tds).find("td:nth(4)").text(); // 확률
        } else if (idx === 1) { // 퀘스트
          rank = $(tds).find("td:nth(100)").text(); // 랭크
          name = $(tds).find("td:nth(0)").text(); // 이름
          place = $(tds).find("td:nth(100)").text(); // 위치
          probability = $(tds).find("td:nth(3)").text(); // 확률
        } else if (idx === 2) { //동료 탐험대
          rank = $(tds).find("td:nth(0)").text(); // 랭크
          name = $(tds).find("td:nth(1)").text(); // 이름
          place = $(tds).find("td:nth(4)").text(); // 위치
          probability = $(tds).find("td:nth(6)").text(); // 확률
        } else if (idx === 3) {
          rank = $(tds).find("td:nth(0)").text(); // 랭크
          name = $(tds).find("td:nth(1)").text(); // 이름
          place = $(tds).find("td:nth(100)").text(); // 위치
          probability = $(tds).find("td:nth(4)").text(); // 확률

        }
 
        fields.push({
          name: `${rank} - ${name}`,
          value: `${place} - ${probability}`,
        });

        if (fields.length >= 25) {
          // 필드수가 25가 넘어가면 새로 만든다 오류 때문
          Embed.push({
            color: 0x0099ff,
            fields: fields,
          });
          fields = [];
        }
      });

      if (fields.length != 0) {
        // 필드수가 0이 아닐때 출력 오류 때문
        Embed.push({
          color: 0x0099ff,
          fields: fields,
        });
      }
    });
  });

  return Embed;
};

module.exports = {
  getItems: parsing,
};
