# reddit-post-image-generation

Generates a 1080x1920 image of a Reddit post that includes the title, subreddit, and logo.

This was written in an hour or two so the code is... pretty bad.

# Instructions

```js
import { generateImage } from 'reddit-post-image-generation'

generateImage(url, pathToSaveImage)
```

`url` is in the format `https://www.reddit.com/r/{subreddit}/comments/{somedata}`. You can get this by clicking on a post.
