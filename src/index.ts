import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

(async () => {
  // const res = await fetch('https://example.com/');
  // if (!res.ok) return;

  // const text = await res.text();
  // const dom = new JSDOM(text);
  // const title = dom.window.document.querySelector('title')?.textContent ?? '';

  // console.log(title);

  // const options = new Options().headless();
  // const driver = await new Builder()
  //   .forBrowser('chrome')
  //   .setChromeOptions(options)
  //   .build();

  // await driver.navigate().to('https://www.example.com/');
  // const title = await driver.getTitle();
  // console.log(title);
})();
