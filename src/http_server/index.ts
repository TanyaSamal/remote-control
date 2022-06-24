import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer((req, res) => {
  const __dirname = path.resolve(path.dirname(''));
  const filePath = path.join(__dirname, (req.url === '/' ? '/front/index.html' : `/front${req.url}`));

  try {
    const stream = fs.createReadStream(filePath);

    res.writeHead(200);
    stream.pipe(res);

    stream.on('error', (error) => {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    });
  } catch (error) {
    res.writeHead(404);
    res.end(JSON.stringify(error));
  }

  // fs.readFile(filePath, (err, data) => {
  //   if (err) {
  //     res.writeHead(404);
  //     res.end(JSON.stringify(err));
  //     return;
  //   }
  //   res.writeHead(200);
  //   res.end(data);
  // });
});
