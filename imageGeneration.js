const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const canvasTxt = require('canvas-txt').default;

registerFont(path.join(__dirname, './fonts/impact.ttf'), { family: 'Impact Condensed' });

async function generateImage(title, subreddit, pathToSave) {
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');
  // give the canvas a gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 1080);
  gradient.addColorStop(0, '#1a1a1a');
  gradient.addColorStop(1, '#282828');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1920, 1080);

  // load the image
  const redditLogo = await loadImage(path.join(__dirname, './media/reddit-logo.png'));
  // draw the image
  ctx.drawImage(redditLogo, 1080, canvas.height / 2 - 400, 800, 800);

  // load the subreddit json from https://www.reddit.com/r/subreddit/about.json
  const subredditJson = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
  const subredditData = await subredditJson.json();
  // get the subreddit icon
  const subredditIcon = await loadImage(subredditData.data.icon_img);
  // draw the subreddit icon
  ctx.drawImage(subredditIcon, 30, 30, 100, 100);

  // make the title half the width of the canvas
  ctx.fillStyle = '#FFFFFF';
  canvasTxt.font = 'Impact';
  canvasTxt.fontSize = 96;
  canvasTxt.align = 'left';

  canvasTxt.drawText(ctx, title, 100, canvas.height / 2 - 250, canvas.width / 2 - 200, 500);
  // write the subreddit
  ctx.fillStyle = '#FF4500';
  canvasTxt.font = 'Sans';
  canvasTxt.fontSize = 60;
  canvasTxt.align = 'left';

  canvasTxt.drawText(ctx, `r/${subreddit}`, 150, 45, canvas.width / 2, 50);
  // show the canvas
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(pathToSave, buffer);
}

module.exports = { generateImage };
