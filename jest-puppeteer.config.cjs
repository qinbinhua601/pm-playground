// jest-puppeteer.config.cjs

/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */

// console.log(process.env.HEADLESS !== "false")
module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== "false",
    product: "chrome",
  },
  browserContext: "default",
  // server: {
  //   command: "vite"
  // }
};