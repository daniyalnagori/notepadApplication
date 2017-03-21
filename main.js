var http = require("http");
var fs = require('fs');
var qs = require('querystring');
const url = require('url');
var storeData = '';
http.createServer(function (req, res) {
    var query = req.url.split('=')[1];
    // console.log(query)
    switch (req.method) {
        case 'GET':
            if (req.url == '/') {
                fs.createReadStream('index.html').pipe(res);
                // res.end()
            }
            else if (req.url == '/about?name=' + query) {
                // fs.createReadStream('./about.html').pipe(res)
                query.split('+').toString().split(',').map((x) => storeData += x + ' ');
                // res.write("<a href='/home'>download</a>");

                // var text_ready = storeData


                // res.writeHead(200, { 'Content-Type': 'application/force-download', 'Content-disposition': 'attachment; filename=file.txt' });

                // res.end(text_ready);
                res.write("<a href='/home'>download</a>");
                res.write(storeData);
                // console.log(storeData)
                res.end();

            }
            else if (req.url == '/home') {
                var text_ready = storeData


                res.writeHead(200, { 'Content-Type': 'application/force-download', 'Content-disposition': 'attachment; filename=file.txt' });

                res.end(text_ready);
            }
    }

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // fs.createReadStream('index.html').pipe(res);
    // console.log(req.url.split('?'))
}).listen(3000);