
jest.setTimeout(300000);

function wait(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * t);
  })
}


// 环境是nodejs，实际访问不到对象
describe('baidu', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4000');
    await page.waitForSelector('.ProseMirror');
    // await jestPuppeteer.debug();
  });
  
  it('should be titled "pm playground"', async () => {
    await wait(3);
    const editorDOM = await page.evaluate(() => {
      // console.log('window', window.view);
      return {
        a: document.querySelector('.ProseMirror').innerText,
        rect: document.querySelector('.ProseMirror').getBoundingClientRect().width
      };
    })
    expect(editorDOM).toBe({});
    await expect(page.title()).resolves.toMatch('pm playground');
  });

});