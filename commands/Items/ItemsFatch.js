const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const getItemsHTML = async (number) => {
  try {
    return await axios.get(
      `https://mhrise.kiranico.com/ko/data/items/${number}`
    );
  } catch (error) {
    console.log(error);
  }
};

const parsing = async (number) => {
  let itemsHTML = await getItemsHTML(number);
  let $ = cheerio.load(itemsHTML.data);

  let fields = [];
  
  const crawlingModule = () => {
    
    let $tbody = $("tbody:nth(0) > tr");
    $tbody.each((_, tag) => {
      let name = $(tag).find("td:nth(0) > a").text();
      let b = $(tag).find("td:nth(2) > div:nth(0)").text();
      let c = $(tag)
      .find("td:nth(4)")
      .text()
      fields.push({ name: name, value: `${b} --- ${c}`});
    });
  };

  crawlingModule();

  return fields;
};

module.exports = {
  getItems: parsing,
};
