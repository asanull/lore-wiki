const client = {
    username: document.getElementById('username').innerText,
    id: document.getElementById('id').innerText,
    avatar: document.getElementById('base64')
}
const socket = io();
window.location.href="#"

var img = new Image();
var base64 = client.avatar.innerText
img.src = base64

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;

var preview=document.getElementById("preview");
var ptx=preview.getContext("2d");
var pw=preview.width;
var ph=preview.height;

var maxW=64;
var maxH=64;

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
            ptx.drawImage(newimg,0,0,128,128);
        }
        newimg.src = URL.createObjectURL(e.target.files[0])
        window.location.href="#change-your-avatar"
    }
}

function setAvatar()
{
    base64 = preview.toDataURL("image/jpeg",0.9)

    var newimg = new Image;
    newimg.onload = function() {
        var iw=newimg.width;
        var ih=newimg.height;
        var scale=Math.min((maxW/iw),(maxH/ih));
        var iwScaled=iw*scale;
        var ihScaled=ih*scale;
        ctx.drawImage(newimg,0,0,64,64);
    }
    newimg.src = base64
    updateAvatar()
}

function removeAvatar()
{
    base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAEAAQAMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAABggJBQf/xAAmEAABAwQCAgICAwAAAAAAAAABAAIDBAUGEQcSCCETFSIxQUJh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDBP/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AoIiIuhkIiICIiAiIgIiICLY/xN5n4Cxvxfxa1PynErEfq2NvlrulbBDUT1YjAqXSQyO7ydnh2vRBaWgetAZF5wyxMzXIG4u+eTGhcKgWt9UCJXUnyO+Ev3/bp13/ALtSXVscRF28HZYn5rj7cofPHjRuFOLo+lBMraT5G/MWa/t07a/3S108suZ+Ask8X8ptTMpxK+n6t7bHa7XWwTVEFWYyKZ0cMbu8fV5bv0AGhwPrYK3CRjgiIqgiIgmOA8P5rynR3qqxDGbjkcVmiZLXfXQmV0LXkhn4j8nE9XaDQTprjrQKiMsT4JXxSsdHIxxa5jxotI/YI/gr1LgDyYzrxqv1XcsMrqeOKu+MV9urqcTU1Y2Pt0Dx6cOvd2ixzT7PvRIVqbz5v+PHONFNPzBwbUfel8ZNdYHRSTVHVutvqBJTTNG9gRlzxrXtTaqgkUT55WRRMdJI9wa1jBsuJ/QA/kqXZ9w/mvFlHZarL8ZuOORXmJ8tD9jCYnTNYQH/AIn8mkdm7DgDpzTrRCubZ/N/x44OooZ+H+Daj70PkIrr+6KOan7N1tlQZKmZw3oGMOYNb9qq3P8A5MZ15K36kuWZ11PJFQ/IKC3UNOIaajbJ17hg9uPbo3Ze5x9D3oAJtHlSIiqCIiAiIgIiICIiD//Z"

    var deafultimg = new Image();
    deafultimg.onload = function() {
        var iw=deafultimg.width;
        var ih=deafultimg.height;
        var scale=Math.min((maxW/iw),(maxH/ih));
        var iwScaled=iw*scale;
        var ihScaled=ih*scale;
        ctx.drawImage(deafultimg,0,0,64,64);
    }

    deafultimg.src = base64
    updateAvatar()
}

function updateAvatar()
{
    var data = {base64:base64, id:client.id};
    socket.emit('updateAvatar', data);
}

function render(scale) {
    canvas.width = scale
    canvas.height = scale
    ctx.drawImage(img,0,0,scale,scale)
}
function logResize() {
    if(window.innerWidth>1917)
    { render(89) }
    else if(window.innerWidth>1599)
    { render(76.5) }
    else
    { render(64) }
}
window.addEventListener('resize', logResize);
