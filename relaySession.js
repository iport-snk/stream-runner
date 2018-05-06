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

    run() {
        let argv = ['-rtsp_transport', 'tcp', '-i', this.conf.inPath, '-vcodec', 'copy', '-an', '-f', 'flv', this.conf.ouPath];

        this.state = STATES.running;
        this.ffmpeg_exec = spawn(env.ffmpeg, argv);
        this.ffmpeg_exec.stderr.on('data', (data) => {
            //console.log(`输出：${data}`);
        });

        this.ffmpeg_exec.on('close', (code) => {
            this.ffmpeg_exec = null;
            if (this.state === STATES.running) {
                this.emit('crashed', this.conf.id);
                this.run();
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