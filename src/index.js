const Crawler = require("crawler");
const { generateImage } = require("./image");

exports.generateImage = function (url, pathToSave) {
	return new Promise((resolve, reject) => {
		new Crawler({
			maxConnections: 10,
			async callback(error, res, done) {
				if (error) {
					reject(error);
				} else {
					const { $ } = res;
					const fullTitle = $("title").text();
					const title = fullTitle.split(":")[0].trim();
					const subreddit = fullTitle.split(":")[1].trim();
					await generateImage(title, subreddit, pathToSave);
					resolve();
				}
				done();
			},
		}).queue(url.trim());
	});
};
