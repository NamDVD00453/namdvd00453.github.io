'use strict'

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const senderId = document.getElementById('senderId');

const callButton = document.getElementById('callButton');

callButton.addEventListener('click', function () {
    callButton.disabled = true;

    var peer = new Peer(senderId.value, {
        host: '165.22.103.228',
        port: 9000,
        path: '/myapp'
    });
    console.log(senderId.value)
    var getUserMedia = navigator.getUserMedia;
    peer.on('call', function(call) {
        getUserMedia({video: true, audio: false}, function(stream) {
            localVideo.srcObject = stream;
            call.answer(stream);

            call.on('stream', function(remoteStream) {
                remoteVideo.srcObject = remoteStream;
            });
        }, function(err) {
            console.log('Failed to get local stream' ,err);
            alert('Failed to get local stream');
        });
    });
})