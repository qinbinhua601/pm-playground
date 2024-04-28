jest.setTimeout(300000);

function wait(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * t);
  })
}

async function getEditorContent(page) {
  return await page.evaluate(() => {
    return window.view.state.doc.toString()
  })
}

async function inputNiByIME(page) {
  const client = await page.createCDPSession();

  // 打n -> n
  await client.send('Input.imeSetComposition', {
    selectionStart: 1,
    selectionEnd: 1,
    text: 'n',
  });
  await page.evaluate(() => {
    const { view, TextSelection } = window
    // console.log(view.state.doc.toString())
  });
  // 打i -> ni
  await client.send('Input.imeSetComposition', {
    selectionStart: 2,
    selectionEnd: 2,
    text: 'ni',
  });
  await page.evaluate(() => {
    const { view, TextSelection } = window
    // console.log(view.state.doc.toString())
  });
  // 选字 -> 你
  await client.send('Input.imeSetComposition', {
    selectionStart: 1,
    selectionEnd: 1,
    text: '你',
  });
  await page.evaluate(() => {
    const { view, TextSelection } = window
    // console.log(view.state.doc.toString())
  });
  // 空格录入 -> 你
  await client.send('Input.insertText', {
    text: '你',
  });
  await page.evaluate(() => {
    const { view, TextSelection } = window
    // console.log(view.state.doc.toString())
  });
}

// 环境是nodejs，实际访问不到对象
describe('pm', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4000');
    await page.waitForSelector('.ProseMirror');
  });

  it('打字你(ni)，未修复，结果 -> 你n', async () => {
    // await wait(3);
    // QIN: 在mention之后的位置打字ni -> 你
    await page.evaluate(() => {
      // console.log('window', a)
      const { view, TextSelection } = window
      const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, 8))
      view.dispatch(tr)
      // console.log(view.state.selection.from, view.state.selection.to)
      view.focus()
    })
    await inputNiByIME(page)
    const editorContent = await getEditorContent(page)
    expect(editorContent).toBe('doc(paragraph("123123", strong(mention), "你n--------------------------------------------------------AAA"))')
  });
  
  it('打字你(ni)，修复，结果: 你', async () => {
    await page.goto('http://localhost:4000/?fixChromeCompositionSolution1=1');
    await page.evaluate(() => {
      const { view, TextSelection } = window
      const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, 8))
      view.dispatch(tr)
      view.focus() 
    })
    await inputNiByIME(page)
    const editorContent = await getEditorContent(page)
    expect(editorContent).toBe('doc(paragraph("123123", strong(mention), "你--------------------------------------------------------AAA"))')
    // await jestPuppeteer.debug();
  });
});