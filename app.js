const fs = require('fs');
const HTTPS = require('https');
const express = require('express');

const port = 3333;
const app = express();

app.get('/hello', (req, res) => {
    res.status(200).send('hello world');
});

// 운영 환경일때만 적용
if (process.env.NODE_ENV == 'production') {
    try {
        const option = {
            ca: fs.readFileSync('/etc/letsencrypt/live/{myurl}/fullchain.pem'),
            key: fs.readFileSync('/etc/letsencrypt/live/{myurl}/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/{myurl}/cert.pem'),
        };

        HTTPS.createServer(option, app).listen(port, () => {
            console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
        });
    } catch (error) {
        console.log('HTTPS 서버가 실행되지 않습니다.');
        console.log(error);
    }
} else {
    app.listen(port, () => {
        console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
    });
}
