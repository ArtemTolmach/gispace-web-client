import puppeteer from "puppeteer";
import faker from 'faker';

describe("Photospheres tests", () => {
  let browser;
  let page;

  beforeAll(async () => {

    browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome'
    });

    page = await browser.newPage();
  });

  it("Test render markers on photosphere", async () => {
        await page.goto("http://localhost:3000/interface/CusDeb/1/10/");

        await page.waitForSelector('.psv-marker', { timeout: 60000 });

        await page.evaluate(() => {
          const markers = document.querySelectorAll('.psv-marker');
          return markers.length > 0;
        });
  });

  it("Test show dropdown menu", async () => {
    await page.goto("http://localhost:3000/interface/CusDeb/1/1/");

    await page.waitForSelector('#sub-btn-location');

    await page.$eval('#sub-btn-location', elem => elem.click());

    await page.waitForSelector('#sub-menu-locations');
    });
  afterAll(() => browser.close());
});


describe("Authentication tests", () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch({
          executablePath: '/usr/bin/google-chrome',
          headless: false,
      });
      page = await browser.newPage();

      await page.setViewport({
        width: 1110,
        height: 1110
      });
    });

    const username = faker.internet.userName();

    const email = faker.internet.email();

    const password = faker.internet.password();

    it("Test register user", async () => {
      await page.goto("http://localhost:3000/register/");

      await page.type('#id_username', username);
      await page.type('#id_email', email);
      await page.type('#id_password1', password);

      await Promise.all([
          page.$eval('#registerButton', elem => elem.click()),
          page.waitForNavigation()
      ]);
    });
    
    it("Test login user", async () => {
        await page.goto("http://localhost:3000/login/");

        await page.type('#id_username', username);
        await page.type('#id_password1', password);

        await Promise.all([
            page.$eval('#loginButton', elem => elem.click()),
            page.waitForNavigation()
        ]);
    });

    it("Test logout user", async () => {
        await page.$eval('#logoutButton', elem => elem.click());

        await page.waitForSelector('#logoutButton', { hidden: true, timeout: 60000 });
    });

    afterAll(() => browser.close());
});
