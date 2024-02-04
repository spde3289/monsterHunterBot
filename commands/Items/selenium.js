const { Builder, Browser, By } = require("selenium-webdriver");

const selenium = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(`https://mhworld.kiranico.com/ko/items`);

    const currentHtml = await driver.findElements(
      By.className("btn btn-secondary")
    );
    currentHtml[1].click();

    const a = await driver.findElements(By.className("col-lg-4 py-2"));

    console.log(a);
  } finally {
    await driver.quit();
  }
};

module.exports = {
  selenium: selenium,
};
