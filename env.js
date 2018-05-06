module.exports = {
    dev: {
        WEBSOCKET_PORT: 8082,
        ffmpeg: "C:\\apps\\ffmpeg-3.4.2-win64-static\\bin\\ffmpeg.exe",
        statics: [{
            id: 54,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.66:554/cam/realmonitor?channel=1&subtype=0',
            out: 'rtmp://localhost:1935/hls/54'
        }, {
            id: 5,
            inp: 'rtsp://zmserver:4hhWHFZDY1@10.10.10.65:10554/profile1',
            out: 'rtmp://localhost:1935/hls/5'
        }]
    },
    prod: {
        WEBSOCKET_PORT: 8082,
        ffmpeg: "/usr/bin/ffmpeg",
        statics: [{
            id: 54,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.66:554/cam/realmonitor?channel=1&subtype=0',
            out: 'rtmp://localhost:1935/hls/54'
        }, {
            id: 5,
            inp: 'rtsp://zmserver:4hhWHFZDY1@10.10.10.65:10554/profile1',
            out: 'rtmp://localhost:1935/hls/5'
        }, {
            id: 17,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.25:554/ch01/0',
            out: 'rtmp://localhost:1935/hls/17'
        }, {
            id: 45,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.35:554/Streaming/Channels/101',
            out: 'rtmp://localhost:1935/hls/45',
        }, {
            id: 31,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.42:554/ch01/0',
            out: 'rtmp://localhost:1935/hls/31',
        }, {
            id: 16,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.24:554/ch01/0',
            out: 'rtmp://localhost:1935/hls/16'
        }, {
            id: 44,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.11:554/Streaming/Channels/101',
            out: 'rtmp://localhost:1935/hls/44'
        }, {
            id: 51,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.12:554/Streaming/Channels/101',
            out: 'rtmp://localhost:1935/hls/51',
        }, {
            id: 50,
            inp: 'rtsp://admin:3edcvfr4@10.10.10.14:554/Streaming/Channels/101',
            out: 'rtmp://localhost:1935/hls/50'
        }]
    }

};