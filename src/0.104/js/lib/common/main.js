window.addEventListener('load', async(event) => {
    const text = await FileLoader.text('./contents/some.txt');
    console.log(text);
    const json = await FileLoader.json('./contents/some.json');
    console.log(json);

    console.log(await FileLoader.load('./contents/some.txt'));
    console.log(await FileLoader.load('./contents/some.json'));
});
