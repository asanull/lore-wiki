const client = {
    username: document.getElementById('username').innerText,
    id: document.getElementById('id').innerText,
    avatar: document.getElementById('avatar')
}
window.location.href = "#ui"
const socket = io();

var img = new Image();
var base64 = avatar.innerText
img.src = base64

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
var maxW=64;
var maxH=64;

ctx.drawImage(img,0,0,64,64)

var input = document.getElementById('input');
var output = document.getElementById('file_output');
input.addEventListener('change', handleFiles);

function handleFiles(e) {
    var file = document.querySelector("#input");
    if ( /\.(jpe?g|png)$/i.test(file.files[0].name) === false )
    {
        console.log('eat shit')
    }
    else
    {
        var newimg = new Image;
        newimg.onload = function() {
            var iw=newimg.width;
            var ih=newimg.height;
            var scale=Math.min((maxW/iw),(maxH/ih));
            var iwScaled=iw*scale;
            var ihScaled=ih*scale;
            ctx.drawImage(newimg,0,0,64,64);
            base64 = canvas.toDataURL("image/jpeg",0.9)
        }
        newimg.src = URL.createObjectURL(e.target.files[0]);
    }
}

function updateAvatar()
{
    socket.emit('updateAvatar', base64);
}