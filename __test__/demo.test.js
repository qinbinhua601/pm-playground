
jest.setTimeout(300000);

function wait(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * t);
  })
}


// 环境是nodejs，实际访问不到对象
describe('editor UI related', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4000');
    await page.waitForSelector('.ProseMirror');
    // await jestPuppeteer.debug();
  });
  
  it('should be titled "pm playground"', async () => {
    await expect(page.title()).resolves.toMatch('pm playground');
  });

  it('ensure editor rectWidth = 780 & editorContent is right', async () => {
    const editorDOM = await page.evaluate(() => {
      // console.log('window', window.view);
      return {
        editorContent: window.view.state.doc.toString(),
        rectWidth: window.view.dom.getBoundingClientRect().width
      };
    })
    expect(editorDOM).toEqual({
      editorContent: 'doc(paragraph("123123", strong(mention), "--------------------------------------------------------AAA"))',
      rectWidth: 780
    });
    // await jestPuppeteer.debug();
  })

});