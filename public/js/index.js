const client = {
    username: document.getElementById('username').innerText,
    avatar: document.getElementById('avatar')
}
var img = new Image();
var base64 = avatar.innerText
img.src = base64
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
function render(scale) {
    canvas.width = scale
    canvas.height = scale
    ctx.drawImage(img,0,0,scale,scale)
}
function rescale() {
    var tab=document.getElementById("homepage-tab")
    var width = window.innerWidth - 522.5
    tab.style.width = `${width}px`
}
function logResize() {
    if(window.innerWidth>1917)
    { render(89) }
    else if(window.innerWidth>1599)
    { render(76.5) }
    else
    { render(64) }

    if(window.innerWidth>=700)
    { rescale() }
}
window.addEventListener('resize', logResize);
