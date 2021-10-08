try
{
    if(document.getElementById("check").innerText=="true")
    {
        var username = document.getElementById("username").innerText
        var email = document.getElementById("email").innerText
        var password = document.getElementById("password").innerText
        var errorcode = document.getElementById("error").innerText
        
        document.getElementsByName("username")[0].value = username
        document.getElementsByName("email")[0].value = email
        document.getElementsByName("password")[0].value = password

        if(errorcode==`1`)
        {
            document.getElementById("usernamelabel").innerText = `Username - username unavailable.`
            document.getElementById("usernamelabel").classList.add("text-danger")
        }
        if(errorcode==`2`)
        {
            document.getElementById("emaillabel").innerText = `Email - email already registered.`
            document.getElementById("emaillabel").classList.add("text-danger")
        }
        if(errorcode==`3`)
        {
            document.getElementById("usernamelabel").innerText = `Username - username unavailable.`
            document.getElementById("usernamelabel").classList.add("text-danger")
            document.getElementById("emaillabel").innerText = `Email - email already registered.`
            document.getElementById("emaillabel").classList.add("text-danger")
        }
    }
}
catch
{
    //probably throwing errors on the login page but cba lol
}
function clearDanger(name)
{
    var element = document.getElementById(`${name}label`);
    element.classList.remove("text-danger");
    if(element.id=="usernamelabel")
    {
        element.innerText = `Username`
    }
    if(element.id=="emaillabel")
    {
        element.innerText = `Email`
    }
}