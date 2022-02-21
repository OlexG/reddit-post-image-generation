var Crawler = require("crawler");
var {generateImage} = require("./imageGeneration");

var c = new Crawler({
  maxConnections : 10,
  callback : async function (error, res, done) {
      if(error){
          console.log(error);
      }else{
          const $ = res.$;
          const fullTitle = $("title").text();
          const title = fullTitle.split(":")[0].trim();
          const subreddit = fullTitle.split(":")[1].trim();
          await generateImage(title, subreddit);
          // quit the process
          process.exit();
      }
      done();
  }
});



// this part is responsible for the CLI
(async () => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const answer = await new Promise((resolve, reject) => {
    readline.question('Enter a reddit link: ', (answer) => {
      resolve(answer)
    })
  })
  // crawl the reddit link

  c.queue(answer.trim());
})();