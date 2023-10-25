/**
 * 自动化UI测试
 *  采用的是puppeteer,它自带了chromium
 *  但是它的安装包比较大，所以我们采用pnpm来安装
 *  功能：
 *  1. 自动化测试
 *  2. 爬虫
 *  3. 生成PDF
 *  4. 截图
 *  5. 模拟不同设备
 *  6. 自动插入jquery
 *  7. 插件式结果存储，支持Redis、MongoDB、MySQL
 *
 *
 *  1. 安装puppeteer：
 *     pnpm add puppeteer
 *
 */

import puppeteer from 'puppeteer-core';

const sleep = (time: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {
                width: 1920,
                height: 1080
            },
            args: ['--start-maximized'],
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
        });
        const page = await browser.newPage();
        await page.goto('https://www.jd.com');
        await page.focus('#key');
        await page.keyboard.sendCharacter('手机');
        await page.click('.button');
        await page.waitForSelector('.gl-item');
        let isScroll = true;
        let step = 500
        while (isScroll) {
            await page.evaluate((step) => {
                window.scrollBy(0, step)
            }, step)
            isScroll = await page.evaluate(() => {
                return document.documentElement.scrollTop < document.documentElement.scrollHeight - document.documentElement.clientHeight
            })
            await sleep(1000)
        }
        await page.screenshot({
            path: '手机.png',
            fullPage: true
        })
        await browser.close();
    })();