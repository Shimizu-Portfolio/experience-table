if (localStorage.getItem('htmlCode') || localStorage.getItem('cssCode') || localStorage.getItem('jsCode')) {
    localStorage.clear();
}

const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const outputFrame = document.getElementById('outputFrame');

htmlCode.value = localStorage.getItem('htmlCode') || '';
cssCode.value = localStorage.getItem('cssCode') || '';
jsCode.value = localStorage.getItem('jsCode') || '';

function updateOutput() {
    const output = outputFrame.contentDocument || outputFrame.contentWindow.document;
    output.open();
    output.write(`
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <style>${cssCode.value}</style>
        </head>
        <body>
            ${htmlCode.value}
            <script>${jsCode.value}<\/script>
        </body>
        </html>
    `);
    output.close();

    localStorage.setItem('htmlCode', htmlCode.value);
    localStorage.setItem('cssCode', cssCode.value);
    localStorage.setItem('jsCode', jsCode.value);
}

htmlCode.addEventListener('input', updateOutput);
cssCode.addEventListener('input', updateOutput);
jsCode.addEventListener('input', updateOutput);

updateOutput();
