const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");
const canvasTxt = require("canvas-txt").default;

const logoPath = path.join(__dirname, "../media/reddit-logo.png");
const fontPath = path.join(__dirname, "../fonts/impact.ttf");

async function generateImage({ title, subreddit, icon }, pathToSave) {
	icon = icon ? icon : logoPath;

	for (const family of ["Impact", "Impact Condensed", "Impact Mono"]) {
		registerFont(fontPath, { family });
	}

	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext("2d");

	const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
	gradient.addColorStop(0, "#1a1a1a");
	gradient.addColorStop(1, "#282828");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 1920, 1080);

	ctx.drawImage(await loadImage(logoPath), 1080, canvas.height / 2 - 400, 800, 800);

	ctx.drawImage(await loadImage(icon), 30, 30, 100, 100);

	ctx.fillStyle = "#FFFFFF";
	canvasTxt.font = "Impact";
	canvasTxt.fontSize = 96;
	canvasTxt.align = "left";

	let textTitle = title;
	if (title.length > 120) {
		textTitle = `${textTitle.substring(0, 117)}...`;
	}

	canvasTxt.drawText(ctx, textTitle, 100, canvas.height / 2 - 250, canvas.width / 2 - 200, 500);
	ctx.fillStyle = "#FF4500";
	canvasTxt.font = "Sans";
	canvasTxt.fontSize = 60;
	canvasTxt.align = "left";
	canvasTxt.drawText(ctx, `r/${subreddit}`, 150, 45, canvas.width / 2, 50);

	return new Promise((resolve, reject) => {
		const stream = canvas.createPNGStream();
		stream.on("end", () => resolve());
		stream.on("close", () => resolve());
		stream.on("error", (err) => reject(err));
		stream.pipe(fs.createWriteStream(pathToSave));
	});
}

module.exports = { generateImage };
