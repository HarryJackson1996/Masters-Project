class Timer {

    /**
     * @constructor 
     * @property {Number} time - Counter for measuring time.
     * @property {Variable} interval -  Variable for handling time interval functionality.
     * @todo - Intergrate logic into framework if time permits.
     */
    constructor() {
        this.time = 0;
        this.interval;
    }

    /** 
     * @description - Creates a timer object. 
     */
    newTimer() {
        var startTime = Date.now();
        this.interval = setInterval(function () {
            var elapsedTime = Date.now() - startTime;
            this.time = ((elapsedTime / 1000).toFixed(3));
            console.log(this.time);
        }, 100);
        on = true;
    }

    /** 
     * @description - Stops the timer. 
     */
    stopTimer() {
        return clearInterval(this.interval);
    }

    /** 
     * @returns {Date} - Returns the current time. 
     */
    getTime() {
        return this.time;
    }
}

