var http = require("http");
var fs = require('fs');
var qs = require('querystring');
const url = require('url');
var status = 0;

http.createServer(function (req, res) {
    var allData = '';
    var storeData = '';
    var query = req.url.split('=')[1];
    console.log(req.url)
    switch (req.method) {
        case 'GET':
            if (req.url == '/') {
                fs.createReadStream('index.html').pipe(res);
            }
            else if (req.url == '/about?name=' + query) {
                query.split('+').toString().split(',').map((x) => storeData += x + ' ');
                res.write("<a href='/home' style='color:black;font-size:30px'>download</a>");
                res.end();
            }
            else if (req.url == '/home') {
                var text_ready = storeData
                res.writeHead(200, { 'Content-Type': 'application/force-download', 'Content-disposition': 'attachment; filename=file.txt' });
                res.end(text_ready);
            }
    }

    // ############    UPLOAD TEXT filename    #########

    res.writeHead(200);
    if (req.method === 'GET') {
        fs.createReadStream('upload.html').pipe(res);
    }
    else if (req.method === 'POST') {
        allData = '';
        var outputFile = fs.createWriteStream('uploadedData');

        req.on('data', function (chunk) {
            allData = '';
            var textChunk = chunk.toString('utf8');
            allData += textChunk.split("Content-Type: text/plain")[1].split('------')[0];
            res.write("<h1 style='text-align:center'>File Uploaded</h1><p>" + allData + "</p>");
            console.log('chunkkkkk', allData.split('------')[0]);
        });
        req.pipe(outputFile);

        req.on('end', function () {
            res.end('');
        });
    }
}).listen(3000);