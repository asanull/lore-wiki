const client = {
    username: document.getElementById('username').innerText,
    avatar: document.getElementById('avatar')
}

var img = new Image();
var base64 = avatar.innerText
img.src = base64

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

function render(scale)
{
    canvas.width = scale
    canvas.height = scale
    ctx.drawImage(img,0,0,scale,scale)
}

function logResize()
{
    if(window.innerWidth>1917)
    {
        render(84)
    }
    else if(window.innerWidth>1599)
    {
        render(74)
    }
    else
    {
        render(64)
    }
}

window.addEventListener('resize', logResize);
