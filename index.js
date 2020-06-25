/**
 * Characters object used by the constructor.
 * @typedef {Object} characters
 * @property {string} [start] - Start of the progress bar string (default: "[")
 * @property {string} [empty] - Character to indicate that the spot is empty (default: "-")
 * @property {string} [full] - Character to indicate that the spot is full (default: "=")
 * @property {string} [end] - End of the progress bar string (default: "]")
 */

/**
* Progress bar implementation without dependecies.
* @class
* @exports
*/
class ProgressBar {
    chars = { start: "[", end: "]", empty: "-", full: "=" };

    /**
    * @param {characters} characters
    * @constructs
    */
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

    /**
    * Returns the current terminal width or the max length. Used in adaptive mode.
    * @return number
    */
    getWidth() {
        return this.out.columns || this.pLen;
    }

    /**
    * Increases the progress by a value
    * @return void
    */
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
    /**
    * Sets the progress to a value
    * @return void
    */
    setProgress(val = 0) {
        this.reset();
        this.progress(val);
    }
    /**
    * Returns the current progress
    * @return number
    */
    getProgress() {
        return this.current;
    }

    /**
    * Resets the progress
    * @return void
    */
    reset() {
        this.current = 0;
        if (this.adaptive)
            this.out.write("\r" + this.chars.start + this.chars.empty.repeat(this.getWidth() - 2) + this.chars.end);
        else
            this.out.write("\r" + this.chars.start + this.chars.empty.repeat(this.pLen) + this.chars.end);
    }
}

module.exports = ProgressBar;