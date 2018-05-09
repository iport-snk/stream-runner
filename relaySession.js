const EventEmitter = require('events');
const {spawn} = require('child_process');
const env = require('./env');
const STATES = {
    running: 1,
    stop: 0
};

class RelaySession extends EventEmitter {
    constructor(conf) {
        super();
        this.conf = conf;
    }

    isAlive() {
        return (this.ffmpeg_exec && this.state === STATES.running )
    }

    run() {
        //#exec_pull ffmpeg -rtsp_transport tcp -r 15 -probesize 32 -analyzeduration 0 -i rtsp://admin:3edcvfr4@10.10.10.11:554/Streaming/Channels/101 -threads 24 -c:v libx264 -bf 15 -g 25 -b:v 300k -profile:v baseline -preset:v faster -tune zerolatency -an -f flv rtmp://localhost:1935/hls/$name;
        let argv = ['-rtsp_transport', 'tcp', '-i', this.conf.inp, '-vcodec', 'copy', '-an', '-f', 'flv', this.conf.out];

        this.state = STATES.running;
        this.ffmpeg_exec = spawn(global.env.ffmpeg, argv);
        this.ffmpeg_exec.stderr.on('data', (data) => {
            //console.log(`输出：${data}`);
        });

        this.ffmpeg_exec.on('close', (code) => {
            this.ffmpeg_exec = null;
            if (this.state === STATES.running) {
                this.emit('crashed', this.conf.id);
                setTimeout(this.run.bind(this), 15000);
            } else {
                this.emit('end', this.conf.id);
            }
        });
    }

    stop(id) {
        this.state = STATES.stop;
        // this.ffmpeg_exec.kill('SIGINT');
        this.ffmpeg_exec.stdin.write('q');
    }
}

module.exports = RelaySession;