# reddit-post-image-generation

Generates a 1080x1920 image of a Reddit post that includes the title, subreddit, and logo.

# Instructions

```js
import { generateImage } from "reddit-post-image-generation";

generateImage(postId, outputPath);
```

`postId` can be found in the URL of a post. For example, in `https://www.reddit.com/r/AskReddit/comments/sxu1jr/dear_nonindians..../`, the post ID is `sxu1jr`.
