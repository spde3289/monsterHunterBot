const { Builder, Browser, By, until } = require("selenium-webdriver");

const selenium = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().setTimeouts({
    implicit: 50000, // 10초
    pageLoad: 30000, // 30초
    script: 30000, // 30초
  });
  await driver.get(`https://mhworld.kiranico.com/ko/items`);
  const currentHtml = await driver.findElements(
    By.className("btn btn-secondary")
  );

  
  console.log(currentHtml[1].getText());
  try {
    currentHtml[1].click();

    const a = await driver.findElement(By.className("col-lg-4 py-2"));
    const aa = a[0]?.findElement(By.css("div < span "))
    console.log(aa);
  } finally {
    // await driver.quit();
  }
};

selenium();

module.exports = {
  selenium: selenium,
};
