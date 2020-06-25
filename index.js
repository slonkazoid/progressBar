class ProgressBar {
    chars = { start: "[", end: "]", empty: "-", full: "=" };

    constructor(out = process.stdout, max = 10, adaptive = true, characters = this.chars) {
        this.out = out;
        this.pLen = max;
        this.adaptive = !!adaptive;

        if (!(typeof this.pLen === "number" && this.pLen > 0))
            throw new Error("maxLength should be atleast 1.");

        if (typeof characters === "object") {
            this.chars.start = (characters.start || this.chars.start)[0];
            this.chars.end = (characters.end || this.chars.end)[0];
            this.chars.full = (characters.full || this.chars.full)[0];
            this.chars.empty = (characters.empty || this.chars.empty)[0];
        }

        this.reset();
    }

    getWidth() {
        return this.out.columns || this.pLen;
    }

    progress(amount = 1) {
        if (amount + this.current > this.pLen)
            this.current = this.pLen;
        else
            this.current += amount;

        let full, empty;
        if (this.adaptive) {
            let fullWidth = this.getWidth();
            let width = fullWidth - 2;
            let fullCount = this.current / (this.pLen / width);
            full = this.chars.full.repeat(Math.floor(fullCount));
            empty = this.chars.empty.repeat(width - Math.floor(fullCount));
        } else {
            full = this.chars.full.repeat(this.current);
            empty = this.chars.empty.repeat(this.pLen - this.current);
        }
        this.out.write("\r" + this.chars.start + full + empty + this.chars.end);
    }
    setProgress(val = 0) {
        this.reset();
        this.progress(val);
    }
    getProgress() {
        return this.current;
    }

    reset() {
        this.current = 0;
        if (this.adaptive)
            this.out.write("\r" + this.chars.start + this.chars.empty.repeat(this.getWidth() - 2) + this.chars.end);
        else
            this.out.write("\r" + this.chars.start + this.chars.empty.repeat(this.pLen) + this.chars.end);
    }
}

module.exports = ProgressBar;

/* EXAMPLE
let bar = new ProgressBar(process.stdout, 10);
setInterval(() => bar.progress(), 500);
setTimeout(() => bar.reset(), 2250);
setTimeout(() => bar.setProgress(1), 4250);
*/