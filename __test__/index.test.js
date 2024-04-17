describe('baidu', () => {
  beforeAll(async () => {
    await page.goto('https://www.baidu.com');
  });
  
  it('should be titled "百度一下，你就知道"', async () => {
    await expect(page.title()).resolves.toMatch('百度一下，你就知道');
  });

});