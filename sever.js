var http = require('http');
var fs = require('fs');
var status = 0;
var allData = '';
var splitdata = ''
var server = http.createServer(function (request, response) {
    response.writeHead(200);
    if (request.method === 'GET') {
        if (request.url === '/checkstatus') {
            response.end(status.toString());
            return;
        }
        fs.createReadStream('filechooser.html').pipe(response);
    }
    else if (request.method === 'POST') {
        allData;
        status = 0;
        var outputFile = fs.createWriteStream('output');
        var total = request.headers['content-length'];
        var progress = 0;

        request.on('data', function (chunk) {
            progress += chunk.length;
            var textChunk = chunk.toString('utf8');
            var perc = parseInt((progress / total) * 100);
            allData += textChunk.split("Content-Type: text/plain")[1].split('------')[0];
            response.write("<h1 style='text-align:center'>File Uploaded</h1><p>" + allData + "</p>");
            console.log('chunkkkkk', allData.split('------')[0]);
            status = perc;
        });
        request.pipe(outputFile);

        request.on('end', function () {
            response.end('');
        });
    }

});

server.listen(3000, function () {
    console.log('Server is listening on 8080');
});