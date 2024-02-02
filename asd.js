const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const getItemsHTML = async () => {
  try {
    return await axios.get(
      `https://mhrise.kiranico.com/ko/data/items?view=material`
    );
  } catch (error) {
    console.log(error);
  }
};

const parsing = async () => {
  let itemsHTML = await getItemsHTML();
  let $ = cheerio.load(itemsHTML.data);

  const json = [];

  const crawlingModule = () => {
    let $divs = $(".items-center");
    $divs.each((_, tag) => {
      let name = $(tag).find("div > p").text();
      let itemNumber = $(tag).find("div img").attr("src");

      console.log(name, itemNumber);
      json.push({
        name: name,
        itemNumber: itemNumber,
      });
    });
  };

  crawlingModule();

  const stringJson = JSON.stringify(json);
  fs.writeFileSync("product.json", stringJson);
};

parsing();

/* module.exports = {
  getItems: parsing,
}; */
