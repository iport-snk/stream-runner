const WS = require('ws');
const env = require('./env');
const RelayServer = require('./relayServer');

let ws = new WS.Server({port: env.WEBSOCKET_PORT});
let rls = new RelayServer();


ws.on('connection', function (socket) {
    socket.on('message', function (data) {
        let message = JSON.parse(data);

        switch (message.cmd) {
            case 'startStream':
                rls.startStream(message.args);
                break;
            case 'stopStream':
                rls.stopStream(message.args.id);
                break;
        }
    });

    //ws.send('something');
});


console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + env.WEBSOCKET_PORT+'/');
