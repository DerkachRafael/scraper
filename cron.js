import cron from 'node-cron';
import {runCron} from "./lib/scrapper";

const task = cron.schedule('* * * * *', () =>  {
    console.log('start task');
    runCron();
    console.log('finish task');

});

task.start();