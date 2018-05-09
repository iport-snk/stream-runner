const RelaySession = require('./relaySession');

class RelayServer {

    constructor () {
        this.streams = new Map();
        this.runStatics();
        //this.runner = setInterval(this.keepRunning.bind(this), 1000);
    }

    watcher (session) {
        setTimeout(session.run, 5000);
        /*this.streams.forEach(stream => {
            if (!stream.isAlive()) {
                stream.run();
            }
        })*/

    }

    runStatics () {
        if (Array.isArray(global.env.statics)) {
            global.env.statics.forEach(this.startStream.bind(this));
        }
    }

    startStream (conf) {
        if (this.streams.has(conf.id)) return;

        let session = new RelaySession(conf);

        session.on('end', id => {
            this.streams.delete(conf.id);
        });
        this.streams.set(conf.id,  session);
        session.run();
    }

    stopStream (id) {
        this.streams.get(id).stop();
        // deny stopping if stream is static
    }
}

module.exports = RelayServer;