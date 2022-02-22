const Crawler = require("crawler");
const fetch = require("node-fetch");
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

					let icon = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
					icon = await icon.json();
					icon = icon?.data?.icon_img;

					await generateImage({ title, subreddit, icon }, pathToSave);
					resolve();
				}
				done();
			},
		}).queue(url.trim());
	});
};
