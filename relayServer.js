const RelaySession = require('./relaySession');

class RelayServer {

    constructor () {
        this.streams = new Map();
        //this.runner = setInterval(this.keepRunning.bind(this), 1000);
    }

    keepRunning () {
        this.streams.forEach(stream => {
            if (stream.session === null) {
                this.startStream(stream.conf)
            }
        })
    }

    startStream (conf) {
        if (this.streams.has(conf.id)) return;

        let session = new RelaySession(conf);

        session.on('end', (id) => {
            this.streams.delete(conf.id);
        });
        this.streams.set(conf.id,  session);
        session.run();
    }

    stopStream (id) {
        this.streams.get(id).stop();
    }
}

module.exports = RelayServer;