import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Builder, By } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

(async () => {
  const options = new Options().headless();
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    const getNicoadEntries = async () => {
      interface entry {
        title: string;
        link: string;
      }

      await driver.navigate().to('https://nicoad.nicovideo.jp/');
      return (
        await Promise.all(
          (await driver.findElements(By.className('carousel-item'))).map(
            async (elem) => {
              const link = await elem.getAttribute('href');
              const res = await fetch(link);

              if (!res.ok) return;

              const dom = new JSDOM(await res.text());
              const $title = dom.window.document.querySelector('title');

              if (!$title) return;
              if (!$title.textContent) return;

              const title = $title.textContent;

              return { title, link };
            }
          )
        )
      ).filter((entry): entry is Required<entry> => Boolean(entry));
    };
    const nicoadEntries = await getNicoadEntries();
    console.log(nicoadEntries);

    const getWikipediaEntry = async () => {
      const rssUrl =
        'https://commons.wikimedia.org/w/api.php?action=featuredfeed&feed=potd&feedformat=atom&language=ja';
      const api = new URL('https://api.rss2json.com/v1/api.json');
      api.searchParams.set('rss_url', rssUrl);
      const res = await fetch(api.toString());

      if (!res.ok) return;

      const json = await res.json();

      if (json.status !== 'ok') return;

      const entry = json.items[json.items.length - 1];

      const dom = new JSDOM(entry.content);
      const $img = dom.window.document.querySelector('img');

      if (!$img) return;

      const imgSrc = $img.src;
      const $description = dom.window.document.querySelector('.description');

      if (!$description) return;
      if (!$description.textContent) return;

      const description = $description.textContent.trim();
      const $a = $description.querySelector<HTMLAnchorElement>('a.extiw');

      if (!$a) return;
      const link = $a.href;

      return { description, src: imgSrc, link };
    };
    const wikipediaEntry = await getWikipediaEntry();
    console.log(wikipediaEntry);
  } finally {
    driver.quit();
  }
})();
