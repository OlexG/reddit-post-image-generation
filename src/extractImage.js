module.exports = function extractImage(postInfo) {
  const { post_hint, url_overridden_by_dest, media_metadata, gallery_data, is_video } = postInfo[0].data.children[0].data;

  if(post_hint === 'image') {
    return {includeImage: true, image: url_overridden_by_dest}
  } else if(media_metadata && !is_video) {
    // Look man, it works... don't ask me how
    return {includeImage: true, image: media_metadata[Object.keys(media_metadata)[0]].s.u.split("amp;").join("")}
  }

  return {includeImage: false, image: null}
}