import { getHTML, getTwitterInfo } from "./lib/scrapper";
import fs from "fs";
import _ from 'lodash';


 function createFbFileWithData(twitterData) {

    const obj = {
        "twitter": _.omit(twitterData, ['isCompact'])
    };

    fs.writeFileSync('./fb.json', JSON.stringify(obj));
}


async function init () {
    const { data } = await getHTML('https://twitter.com/RafaelDerkach');
    const twitterData = await getTwitterInfo(data);

    createFbFileWithData(twitterData)
}

init();