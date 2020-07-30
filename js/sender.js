'use strict'

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const PsenderID = document.getElementById('PsenderID');

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function () {
  startButton.disabled = true;
  var senderId = makeid(10);
    var peer = new Peer(senderId, {
        host: '165.22.103.228',
        port: 9000,
        path: '/myapp'
    });

    console.log('Sender ID: ' + senderId);


    var receiverId = makeid(10);
    PsenderID.textContent = 'Call ID: ' + receiverId;
    PsenderID.hidden = false;

    var getUserMedia = navigator.getUserMedia;
    getUserMedia({video: true, audio: false}, function(stream) {
        localVideo.srcObject = stream;
        var call = peer.call(receiverId, stream);

        call.on('stream', function(remoteStream) {
            remoteVideo.srcObject = remoteStream;
        });
    }, function(err) {
        console.log('Failed to get local stream' ,err);
        alert('Failed to get local stream');
    });
})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

