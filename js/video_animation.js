class VideoAnimation {
    constructor(video) {
        this.stops = [];
        this.currentStop = -1;
        this.video = video;
        if (video.load) {
            video.load();
        }
        video.addEventListener('playing', this.onPlay.bind(this));
        video.addEventListener('play', this.onPlay.bind(this));
    }

    progress() {
        return this.video.currentTime / this.video.duration;
    }

    onPlay() {
        if (this.onPlayCatched) {
            return;
        }
        this.onPlayCatched = true;
        this.currentStop += 1;
        this.timeout = null;
        if (this.currentStop < this.stops.length) {
            let interval = (this.stops[this.currentStop] - this.video.currentTime) * 1000;
            this.timeout = setTimeout(function(interval) {
                console.log('Pausado após: ' + interval + 'ms');
                this.video.pause();
            }.bind(this, interval), interval);
        }
    }

    play() {
        if (this.video.currentTime == this.video.duration) {
            return;
        }
        this.onPlayCatched = false;
        console.log('Play');
        this.video.play();
    }

    pause() {
        if (this.video.paused) {
            return;
        } else if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.video.pause();
        this.currentStop -= 1;
    }

    rewind() {
        this.pause();
        this.video.currentTime = 0;
        this.currentStop = -1;
    }

    restart() {
        this.rewind();
        this.play();
    }

    reverse() {
        if (!this.video.paused) {
            clearTimeout(this.timeout);
            this.currentStop -= 1;
        }
        if (this.stops.length > 0 && this.currentStop > 0) {
            this.currentStop -= 1;
            this.video.currentTime = this.stops[this.currentStop];
        } else {
            this.currentStop = -1;
            this.video.currentTime = 0;
        }
        this.play();
    }

    addStop(time) {
        if (time.constructor === Array) {
            Array.prototype.push.apply(this.stops, time);
        } else {
            this.stops.push(time);
        }
        this.stops.sort((a, b) => a - b);
    }
}

// testar com https://www.w3.org/2010/05/video/mediaevents.html
