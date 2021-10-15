var guest = false;
const client = {
    username: document.getElementById('username').innerText,
    avatar: document.getElementById('avatar')
}
if(client.username!='')
{
    var img = new Image();
    var base64 = client.avatar.innerText
    img.src = base64
    document.getElementById('profile-username').innerText = client.username
}
else
{
    guest = true

    var img = new Image();
    var base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAEAAQAMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAABggJBQf/xAAmEAABAwQCAgICAwAAAAAAAAABAAIDBAUGEQcSCCETFSIxQUJh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDBP/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AoIiIuhkIiICIiAiIgIiICLY/xN5n4Cxvxfxa1PynErEfq2NvlrulbBDUT1YjAqXSQyO7ydnh2vRBaWgetAZF5wyxMzXIG4u+eTGhcKgWt9UCJXUnyO+Ev3/bp13/ALtSXVscRF28HZYn5rj7cofPHjRuFOLo+lBMraT5G/MWa/t07a/3S108suZ+Ask8X8ptTMpxK+n6t7bHa7XWwTVEFWYyKZ0cMbu8fV5bv0AGhwPrYK3CRjgiIqgiIgmOA8P5rynR3qqxDGbjkcVmiZLXfXQmV0LXkhn4j8nE9XaDQTprjrQKiMsT4JXxSsdHIxxa5jxotI/YI/gr1LgDyYzrxqv1XcsMrqeOKu+MV9urqcTU1Y2Pt0Dx6cOvd2ixzT7PvRIVqbz5v+PHONFNPzBwbUfel8ZNdYHRSTVHVutvqBJTTNG9gRlzxrXtTaqgkUT55WRRMdJI9wa1jBsuJ/QA/kqXZ9w/mvFlHZarL8ZuOORXmJ8tD9jCYnTNYQH/AIn8mkdm7DgDpzTrRCubZ/N/x44OooZ+H+Daj70PkIrr+6KOan7N1tlQZKmZw3oGMOYNb9qq3P8A5MZ15K36kuWZ11PJFQ/IKC3UNOIaajbJ17hg9uPbo3Ze5x9D3oAJtHlSIiqCIiAiIgIiICIiD//Z"
    img.src = base64
    document.getElementById('profile-username').innerText = "Guest"
    document.getElementById('profile-button').innerText = "Login"
    document.getElementById('profile-button').href = "/login"
}
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
function render(scale) {
    canvas.width = scale
    canvas.height = scale
    ctx.drawImage(img,0,0,scale,scale)
}
function scaleTab() {
    var tab=document.getElementById("homepage-tab")
    var width = window.innerWidth - 522.5
    tab.style.width = `${width}px`
}
function scaleContent() {
    var content=document.getElementById("homepage-content")
    var height = window.innerHeight - 300
    if(window.innerWidth>=1920)
    { height = window.innerHeight - 364 }
    else if(window.innerWidth>=1600)
    { height = window.innerHeight - 312 }
    else if(window.innerWidth>=700)
    { height = window.innerHeight - 260 }
    else
    { height = window.innerHeight - 290 }
    content.style.height = `${height}px`
}
function logResize() {
    if(window.innerWidth>=1920)
    { render(89) }
    else if(window.innerWidth>1599)
    { render(76.5) }
    else
    { render(64) }

    if(window.innerWidth>=700)
    { scaleTab() }
    
    scaleContent()
}
window.addEventListener('resize', logResize);
