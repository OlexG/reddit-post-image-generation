const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const canvasTxt = require("canvas-txt").default;

async function generateImage(title, subreddit, pathToSave) {
	const font = path.join(__dirname, "../fonts/impact.ttf");
	registerFont(font, { family: "Impact" });

	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext("2d");

	const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
	gradient.addColorStop(0, "#1a1a1a");
	gradient.addColorStop(1, "#282828");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 1920, 1080);

	const redditLogo = await loadImage(path.join(__dirname, "../media/reddit-logo.png"));
	ctx.drawImage(redditLogo, 1080, canvas.height / 2 - 400, 800, 800);

	const subredditJson = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
	const subredditData = await subredditJson.json();

	const iconURL = subredditData.data.icon_img
		? subredditData.data.icon_img
		: path.join(__dirname, "../media/reddit-logo.png");
	const subredditIcon = await loadImage(iconURL);
	ctx.drawImage(subredditIcon, 30, 30, 100, 100);

	ctx.fillStyle = "#FFFFFF";
	canvasTxt.font = "Impact";
	canvasTxt.fontSize = 96;
	canvasTxt.align = "left";

	let textTitle = title;
	if (title.length > 120) {
		textTitle = `${textTitle.substring(0, 120)}...`;
	}

	canvasTxt.drawText(ctx, textTitle, 100, canvas.height / 2 - 250, canvas.width / 2 - 200, 500);
	ctx.fillStyle = "#FF4500";
	canvasTxt.font = "Sans";
	canvasTxt.fontSize = 60;
	canvasTxt.align = "left";
	canvasTxt.drawText(ctx, `r/${subreddit}`, 150, 45, canvas.width / 2, 50);

	canvas.createPNGStream().pipe(fs.createWriteStream(pathToSave));
}

module.exports = { generateImage };
