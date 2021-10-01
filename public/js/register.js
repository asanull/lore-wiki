window.location.href = "#ui"
try
{
    if(document.getElementById("check").innerText=="true")
    {
        var username = document.getElementById("username").innerText
        var email = document.getElementById("email").innerText
        var password = document.getElementById("password").innerText
        
        document.getElementsByName("username")[0].value = username
        document.getElementsByName("email")[0].value = email
        document.getElementsByName("password")[0].value = password

        if(username==``)
        {
            document.getElementsByName("username")[0].placeholder = `Username already in use.`
        }
        if(email==``)
        {
            document.getElementsByName("email")[0].placeholder = `Email already in use.`
        }
    }
}
catch (e)
{
    console.log(e)
}