const fetch = require("node-fetch");
const extractImage = require("./extractImage");
const { generateImage } = require("./image");

exports.generateImage = async function (postId, pathToSave) {
	let postInfo = await fetch(`https://www.reddit.com/comments/${postId}/.json`);
	postInfo = await postInfo.json();
	const { title, subreddit } = postInfo[0].data.children[0].data;

	let icon = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
	icon = await icon.json();
	icon = icon.data?.icon_img;

	const {includeImage, image} = extractImage(postInfo)

	await generateImage({ title, subreddit, icon, includeImage, image }, pathToSave);
};
