
import Koa  from 'koa';
import Router  from 'koa-router';
import json  from 'koa-json';
import {getInstagramCount, getTwitterCount} from "./lib/scrapper";

const app = new Koa();

const router = new Router();



router.get('/scrapes', async (ctx, next) => {
    const [instagram, twitter] = await Promise.all([getInstagramCount(), getTwitterCount()]);
    await next();

    ctx.body = {
        instagram,
        twitter
    }

});
app.use(router.routes());

export {
    app
}