import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import { renameProp } from './renameProp'


export async function getHTML(url) {
    const res = axios.get(url);
    return res;
}

export async function getTwitterInfo(html) {
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

