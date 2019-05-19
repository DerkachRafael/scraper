import puppeteer from 'puppeteer';
import fs from 'fs';

const JSONToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2), (e) => console.log(e));

const scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('http://hdrezka-ag.com/?filter=popular', { waitUntil: 'domcontentloaded' });

    const result = await page.evaluate( () => {
        const getFirstNthItems =  (arr, num) => arr.slice(0, num);
        const parentSelector = '.b-content__inline_item';
        const domElements = Array.from(document.querySelectorAll(parentSelector));

        return getFirstNthItems(domElements, 10).map( elem => ({
                title: elem.querySelector('.b-content__inline_item-link').innerText,
                link: elem.querySelector('.b-content__inline_item-link a').href
        }));

    });

    await browser.close();
    return result;


};

scrape()
    .then(data => JSONToFile(data, 'top10fromHdRezka'))
    .catch( e => console.log(e));