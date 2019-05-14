import axios from 'axios';
import cheerio from 'cheerio';
import { renameProp } from './renameProp'
import {getDb} from "../db";


async function getHTML(url) {
    const res = await axios.get(url);
    return res;
}

async function getTwitterInfo(html) {
    const $ = cheerio.load(html);

    const followersBlock = $('[data-nav="followers"] .ProfileNav-value').data();
    const twitsBlock = $('.ProfileNav-item--tweets .ProfileNav-value').data();
    const favoritesBlock = $('[data-nav="favorites"] .ProfileNav-value').data();

    const followers = renameProp('count', 'followers', followersBlock);
    const twits = renameProp('count', 'twits', twitsBlock);
    const favorites = renameProp('count', 'favorites', favoritesBlock);

    const twitterData = { ...followers, ...twits, ...favorites };

    return twitterData;
}

async function getInstagramInfo(html) {
    const $ = cheerio.load(html);
    const dataToObj = JSON.parse($('[type="application/ld+json"]').html());

    return {
        date: new Date(),
        instaFollowers: +dataToObj.mainEntityofPage.interactionStatistic.userInteractionCount
    };

}

async function getInstagramCount() {
    const html = await getHTML('https://www.instagram.com/rafael_derkach');
    const instagramCount = await getInstagramInfo(html.data);

    return instagramCount
}

async function getTwitterCount() {
    const html = await getHTML('https://twitter.com/RafaelDerkach');
    const twitCount = await getTwitterInfo(html.data);

    return twitCount
}

async function runCron() {
    const [instagram, twitter] = await Promise.all([getInstagramCount(), getTwitterCount()]);

    getDb()
        .get('instaData')
        .push({ instagram })
        .write()

    getDb()
        .get('twitData')
        .push({ twitter })
        .write()
}

export {
    getHTML,
    getTwitterInfo,
    getInstagramCount,
    getTwitterCount,
    getInstagramInfo,
    runCron
}
