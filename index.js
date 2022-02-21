var Crawler = require("crawler");
var {generateImage} = require("./imageGeneration");





exports.generateImage = function(url, pathToSave){
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
            await generateImage(title, subreddit, pathToSave);
            // quit the process
            process.exit();
        }
        done();
    }
  });
  c.queue(url.trim());
}