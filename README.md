# progress-bar-node

#### A zero-dependecy progress bar implementation in NodeJS.

[Install](#installation)
[Example](#examples)
[Docs](#documentation)

### Installation:

##### installation via `npm`:

```
$ npm i progress-bar-node
```

##### Manual (via `git clone`) installation

```
/your/project$ git clone https://github.com/uAliFurkanY/progressBar
/your/project$ mv progressBar/index.js progressBar.js
/your/project$ rm -r progressBar
```

Require with `require("./progressBar")`

### Examples:

##### Simple progress bar using `reset`, `setProgress` and `progress` functions

```js
const ProgressBar = require("progress-bar-node");
let bar = new ProgressBar(process.stdout, 10);
setInterval(() => bar.progress(), 500);
setTimeout(() => bar.reset(), 2250);
setTimeout(() => bar.setProgress(1), 4250);
```

##### Reading the logs while showing the status

```js
const ProgressBar = require("progress-bar-node");
const fs = require("fs");
let bar = new ProgressBar(process.stdout, 3);
let phpLogs, serverLogs, dbLogs;
fs.promises.readFile("php.log").then(value => {
    phpLogs = value;
    bar.progress();
});
fs.promises.readFile("lighttpd.log").then(value => {
    serverLogs = value;
    bar.progress();
});
fs.promises.readFile("mysql.log").then(value => {
    dbLogs = value;
    bar.progress();
});
```

### Documentation:

##### With Defaults:

```js
    let bar = new ProgressBar(
    /* write or duplex stream */ process.stdout,
    /* max progress (also max length + 2 if adaptive is off) */ 10,
    /* adaptive mode (sets max length to window length) */ true,
    /* characters to use */, { start: "[", full: "=", empty: "-", end: "]" }
    ); // Calls ProgressBar.reset()
    bar.progress(
        /* amount to add to progress */ 1
    ); // Adds progress
    let prog = bar.getProgress(); // Returns the current progress
    bar.reset(); // Resets the progress
    bar.setProgress(
        /* amount to set the progress to */ 0
    ); // Sets the progress
    let width = bar.getWidth(); // Returns the length of the bar
```
