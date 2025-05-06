const path = require('path');
const express = require('express');
const { createSSRApp } = require('vue')
const manifest = require('../dist/manifest.json');
const { renderToString } = require('@vue/server-renderer');

const server = express();
const appPath = path.join(__dirname, '../dist', manifest['app.js']);
const App = require(appPath).default; // Import the app from the manifest

server.use("/img", express.static(path.join(__dirname, '../dist', 'img')));
server.use("/js", express.static(path.join(__dirname, '../dist', 'js')));
server.use("/css", express.static(path.join(__dirname, '../dist', 'css')));
server.use("/favicon.ico", express.static(path.join(__dirname, '../dist', 'favicons.ico')));

server.get(/(.*)/, async (req, res) => {
    const app = createSSRApp(App);
    const appContent = await renderToString(app)
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>My App</title>
                <link rel="stylesheet" href="${manifest["app.css"]}" />
            </head>
            <body>
                ${appContent}
            </body>
        </html>
    `;

    res.send(html);
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});