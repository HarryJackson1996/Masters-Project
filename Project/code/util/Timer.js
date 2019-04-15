class Timer {
    
    constructor() {
        this.time = 0;
        this.interval;
    }

    newTimer() {
        var startTime = Date.now();
        this.interval = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            this.time = ((elapsedTime/1000).toFixed(3));
            console.log(this.time);
        }, 100);
        on = true;
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    getTime() {
        return this.time;
    }
}

