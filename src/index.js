const fetch = require("node-fetch");
const { generateImage } = require("./image");

exports.generateImage = async function (postId, pathToSave) {
	let postInfo = await fetch(`https://www.reddit.com/comments/${postId}/.json`);
	postInfo = await postInfo.json();
	const { title, subreddit, url_overridden_by_dest } = postInfo[0].data.children[0].data;

	console.log(postInfo[0].data.children[0].data)

	let icon = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
	icon = await icon.json();
	icon = icon.data?.icon_img;

	await generateImage({ title, subreddit, icon, url_overridden_by_dest }, pathToSave);
};
