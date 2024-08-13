const { Builder, Browser, By, until } = require("selenium-webdriver");
const fs = require("fs");

const selenium = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().setTimeouts({
    implicit: 50000, // 10초
    pageLoad: 30000, // 30초
    script: 30000, // 30초
  });

  await driver.get(`https://mhworld.kiranico.com/ko/items`);

  try {
    const currentHtml = await driver.findElements(
      By.className("btn btn-secondary")
    );

    currentHtml[1].click();

    await driver.sleep(25000);

    const itemList = await driver.findElements(By.className("col-lg-4 py-2"));

    await setJson(itemList);
  } finally {
    await driver.quit();
  }
};

const setJson = async (data) => {
  const json = [];

  for (let i = 0; i < data.length; i++) {
    const text = await data[i].findElement(By.css("a")).getText();
    const href = await data[i].findElement(By.css("a")).getAttribute("href");

    json.push({
      name: text,
      href: href,
    });
  }

  const stringJson = JSON.stringify(json);
  fs.writeFileSync("product.json", stringJson);

  return json;
};

selenium();

module.exports = {
  selenium: selenium,
};
