# progressBar
#### A zero-dependecy progress bar implementation in NodeJS.

[Example](#example)
[Documentation](#documentation)

### Example:
```js
let bar = new ProgressBar(process.stdout, 10);
setInterval(() => bar.progress(), 500);
setTimeout(() => bar.reset(), 2250);
setTimeout(() => bar.setProgress(1), 4250);
```

### Documentation:
