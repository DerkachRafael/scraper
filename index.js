import {getHTML, getInstagramInfo, getTwitterInfo} from "./lib/scrapper";
import fs from "fs";
import _ from 'lodash';
import ObjectsToCsv from 'objects-to-csv';


function createFbFileWithData(twitterData) {

    const obj = {
        "twitter": _.omit(twitterData, ['isCompact'])
    };

    fs.writeFileSync('./fb.json', JSON.stringify(obj, null, 4))
}



async function init () {

    const instaPromise = getHTML('https://www.instagram.com/rafael_derkach');
    const twitPromise = getHTML('https://twitter.com/RafaelDerkach');

    const [instaHtml, twitHtml] = await Promise.all([instaPromise, twitPromise]);

    const twitterData = await getTwitterInfo(twitHtml.data);
    console.log(twitterData);
    createFbFileWithData(twitterData);

    const instagramData = await getInstagramInfo(instaHtml.data);
    console.log(instagramData);

    //catch success promise
    // const results = await Promise.all([instaPromise, twitPromise].map(p => p.catch(e => e)));
    // const validResults = results.filter(result => !(result instanceof Error));

    const csvInsta = new ObjectsToCsv(instagramData);
    await csvInsta.toDisk('./instagram.csv');
}

init();