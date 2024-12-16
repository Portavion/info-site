const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    console.log(q);
    let filename = "";
    if (q.pathname === "/") {
      filename = "./" + "index.html";
    } else if (q.pathname === "/about") {
      filename = "." + "/about.html";
    } else if (q.pathname === "/contact-me") {
      filename = "." + "/contact-me.html";
    } else {
      filename = "." + "/404.html";
    }

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.readFile("404.html", function (err, data) {
          if (err) {
            res.writeHead(404, { "Content-Type": "text-html" });
            return res.end;
          }
          res.write(data);
          return res.end();
        });
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
