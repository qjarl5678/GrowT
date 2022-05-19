import loaders from "./loaders/express.js";
import express from "express";
import https from "https";
import fs from "fs";

async function startServer() {
  /* 서버에서 key
  const options = {
	  ca:fs.readFileSync('/ubuntu/Key/node/growingtrip.com.ca-bundle.pem'),
	  key:fs.readFileSync('/ubuntu/Key/node/growingtrip.com.key.pem'),
	  cert:fs.readFileSync('/ubuntu/Key/node/growingtrip.com.crt.pem'),
  	  minVersion:"TLSv1.2"
  }*/

  // 창현 로컬에서 key
  const options = {
	  ca:fs.readFileSync('../Key/growingtrip.com.ca-bundle.pem'),
	  key:fs.readFileSync('../Key/growingtrip.com.key.pem'),
	  cert:fs.readFileSync('../Key/growingtrip.com.crt.pem'),
  	  minVersion:"TLSv1.2"
  }

  const app = express();
  const port = 3000;
  await loaders(app);
 
  console.log(options);
  https.createServer(options,app).listen(port);
  /*
  app.listen(port, host, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
  */
}
await startServer();
