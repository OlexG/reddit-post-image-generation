# reddit-post-image-generation

Generates a 1080x1920 image of a Reddit post that includes the title, subreddit, and logo.

This was written in an hour or two so the code is... pretty bad.

# Instructions

```js
import { generateImage } from "reddit-post-image-generation";

generateImage(postId, outputPath);
```

`postId` can be found in the URL of a post. For example, in `https://www.reddit.com/r/AskReddit/comments/sxu1jr/dear_nonindians_of_reddit_what_is_the_first_thing/`, the post ID is `sxu1jr`.
