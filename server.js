const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 9443;
const staticRoot = 'static';

app.use(express.static(staticRoot,{maxAge:3600}));
 
const server = https.createServer({
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
},app).listen(port, () => {
    console.log(`Listening at https://localhost:${port}`)
});