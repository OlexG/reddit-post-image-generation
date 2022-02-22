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
					const fullTitle = res.$("title").text();
					const [title, subreddit] = fullTitle.split(":").map((s) => s.trim());
					await generateImage(title, subreddit, pathToSave);
					resolve();
				}
				done();
			},
		}).queue(url.trim());
	});
};
