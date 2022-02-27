const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const logoPath = path.join(__dirname, "../media/reddit-logo.png");
const fontPath = path.join(__dirname, "../fonts/impact.ttf");

const colors = ["#4d91ff", "#ff9a4d", "#ff4d4d", "#fffc4d", "#9aff4d", "#4dffb5", "#614dff", "#b24dff", "#ff4dd0"]

function getLines(ctx, text, maxWidth) {
	var words = text.split(" ");
	var lines = [];
	var currentLine = words[0];

	for (var i = 1; i < words.length; i++) {
			var word = words[i];
			var width = ctx.measureText(currentLine + " " + word).width;
			if (width < maxWidth) {
					currentLine += " " + word;
			} else {
					lines.push(currentLine);
					currentLine = word;
			}
	}
	lines.push(currentLine);
	return lines;
}

async function generateImage({ title, subreddit, icon, includeImage, image }, pathToSave) {
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

	if(includeImage) {
		const loadedImage = await loadImage(image)

		// Figure out the ratio
		const ratioX = 800 / loadedImage.width;
		const ratioY = 800 / loadedImage.height;

		// use whichever multiplier is smaller
		const ratio = ratioX < ratioY ? ratioX : ratioY;

		const width = loadedImage.width * ratio
		const height = loadedImage.height * ratio

		ctx.drawImage(await loadImage(image), 1080, (canvas.height - height) / 2, width, height);
	} else {
		ctx.drawImage(await loadImage(logoPath), 1080, canvas.height / 2 - 400, 800, 800);
	}

	ctx.drawImage(await loadImage(icon), 30, 30, 100, 100);

	let color = colors[Math.floor(Math.random()*colors.length)]

	let textTitle = title;
	if (title.length > 100) {
		textTitle = `${textTitle.substring(0, 97)}...`;
	}

	const fontSize = Math.floor((100 - textTitle.length) + 96)
	ctx.font = `${fontSize}px Impact`;

	let lines = getLines(ctx, textTitle, 900)
	ctx.align = "left";

	for(const [i, line] of lines.entries()) {
		let xPos = 100
		let words = line.split(" ").map((word)=>word+" ")
		for(const [j, word] of words.entries()) {
			if(word.length > 4 && Math.random() > 0.5) {
				ctx.fillStyle = color
			} else {
				ctx.fillStyle = "white"
			}
			ctx.fillText(word, xPos, 150 + fontSize + i * (900/lines.length));
			xPos += ctx.measureText(word).width
		}
	}

	// canvasTxt.drawText(ctx, textTitle, 100, canvas.height / 2 - 250, 1000, 500);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "100px Sans";
	ctx.align = "left";
	ctx.fillText(`r/${subreddit}`, 150, 150/2 + 30);

	const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(pathToSave, buffer)
}

module.exports = { generateImage };
