// dependencies
// bcrypt dotenv ejs express express-flash express-session method-override moment nodemon passport passport-local socket.io socketio

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const fs = require('fs');
const path = require('path')
const http = require('http');
const express = require('express')
const socketio = require('socket.io');
const app = express()
const server = http.createServer(app);
const io = socketio(server);
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const moment = require('moment');
const verbose = true;

const initializePassport = require('./utils/passport-config')
initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
)
var users = []
try
{
  let rawdata = fs.readFileSync('../data/users.json');
  let usersjson = JSON.parse(rawdata);
  for (var i = 0; i < usersjson.length; i++)
  {
    users.push(usersjson[i])
  }
}
catch (e)
{
  console.log(e)
}

app.set('trust proxy', 1)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

function getAvatar(id) {

  let rawdata = fs.readFileSync(path.resolve(`../data/users/${id}.json`))
  let user = JSON.parse(rawdata)
  return user.data[0].avatar

}

app.get('/', (req, res) => {
  
  if(req.user!=undefined) {
    try {
      res.render('index.ejs', { username: req.user.username, avatar: getAvatar(req.user.id)})
    } catch (error) {
      res.render('error.ejs')
      console.log(error)
    }
  }
  else {
    res.render('index.ejs', { username: null, avatar: defaultavatar})
  }
})

app.get('/profile', checkAuthenticated, (req, res) => {
  res.render('profile.ejs', { username: req.user.username, id: req.user.id, avatar: getAvatar(req.user.id)})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', {
    check: false,
    email: null,
    username: null,
    password: null,
    error: 0
  })
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  
  var matchingusernames = 0
  users.forEach(user =>
  {if(user.username == req.body.username)matchingusernames++;});
  var matchingemails = 0
  users.forEach(user =>
  {if(user.email == req.body.email)matchingemails++;});
  
  if(matchingusernames==0&&matchingemails==0)
  {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      
      //add user to database
      pushUser(req.body.email,req.body.username,hashedPassword)

      res.redirect('/login')
    } catch (e){
      res.redirect('/register')
    }
  }
  else
  {
    var errorcode = 0
    if(matchingusernames>0)errorcode=1
    if(matchingemails>0)errorcode=2
    if(matchingemails>0&matchingusernames>0)errorcode=3

    res.render('register.ejs', {
      check: true,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      error: errorcode
    })
  }
})

function findFile(filename, filetype)
{
  return path.join(__dirname, `./public/${filetype}`, `${filename}.${filetype}`)

}

// CSS Files
app.get('/css/halfmoon.css', (req, res) => {
  res.sendFile(findFile('halfmoon','css'))
})
app.get('/css/lore-wiki.css', (req, res) => {
  res.sendFile(findFile('lore-wiki','css'))
})
app.get('/css/homepage.css', (req, res) => {
  res.sendFile(findFile('homepage','css'))
})
app.get('/css/profile.css', (req, res) => {
  res.sendFile(findFile('profile','css'))
})
app.get('/css/error.css', (req, res) => {
  res.sendFile(findFile('error','css'))
})

// Font File
app.get('/woff/whitneymedium.woff', (req, res) => {
  res.sendFile(findFile('whitneymedium','woff'))
})

// Manifest File
app.get('/icon/site.webmanifest', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/icon`, `/site.webmanifest`))
})

// JS Files
app.get('/js/halfmoon.min.js', (req, res) => {
  res.sendFile(findFile('halfmoon.min','js'))
})
app.get('/js/index.js', (req, res) => {
  res.sendFile(findFile('index','js'))
})
app.get('/js/profile.js', (req, res) => {
  res.sendFile(findFile('profile','js'))
})
app.get('/js/register.js', (req, res) => {
  res.sendFile(findFile('register','js'))
})

app.get('/*', (req, res) => {
  res.render('error.ejs')
})

app.use(express.static(path.join(__dirname, 'public')))

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

function log(title, message)
{
  file = title
  title = title.toUpperCase()
  console.log(`[${title}] ${message}`)
  fs.appendFileSync(`../data/${file}.log`, `[${title}] ${message} [${moment().format('DD/MM/YYYY][hh:mm')}]\r\n`);
}

const defaultavatar = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAEAAQAMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAABggJBQf/xAAmEAABAwQCAgICAwAAAAAAAAABAAIDBAUGEQcSCCETFSIxQUJh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDBP/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AoIiIuhkIiICIiAiIgIiICLY/xN5n4Cxvxfxa1PynErEfq2NvlrulbBDUT1YjAqXSQyO7ydnh2vRBaWgetAZF5wyxMzXIG4u+eTGhcKgWt9UCJXUnyO+Ev3/bp13/ALtSXVscRF28HZYn5rj7cofPHjRuFOLo+lBMraT5G/MWa/t07a/3S108suZ+Ask8X8ptTMpxK+n6t7bHa7XWwTVEFWYyKZ0cMbu8fV5bv0AGhwPrYK3CRjgiIqgiIgmOA8P5rynR3qqxDGbjkcVmiZLXfXQmV0LXkhn4j8nE9XaDQTprjrQKiMsT4JXxSsdHIxxa5jxotI/YI/gr1LgDyYzrxqv1XcsMrqeOKu+MV9urqcTU1Y2Pt0Dx6cOvd2ixzT7PvRIVqbz5v+PHONFNPzBwbUfel8ZNdYHRSTVHVutvqBJTTNG9gRlzxrXtTaqgkUT55WRRMdJI9wa1jBsuJ/QA/kqXZ9w/mvFlHZarL8ZuOORXmJ8tD9jCYnTNYQH/AIn8mkdm7DgDpzTrRCubZ/N/x44OooZ+H+Daj70PkIrr+6KOan7N1tlQZKmZw3oGMOYNb9qq3P8A5MZ15K36kuWZ11PJFQ/IKC3UNOIaajbJ17hg9uPbo3Ze5x9D3oAJtHlSIiqCIiAiIgIiICIiD//Z"

function pushUser(email, username, password)
{
  var newid = Date.now().toString()
  users.push({
    id: newid,
    email: email,
    username: username,
    password: password,
    avatar: defaultavatar
  })
  fs.readFile('../data/users.json', function (err, data) {
    var json = JSON.parse(data);
    json.push({
      id: newid,
      email: email,
      username: username,
      password: password
    });    
    fs.writeFile("../data/users.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log(`User '${username}' was added to users.json at [${moment().format('DD/MM/YYYY][hh:mm')}]`);
    });
  })
  fs.readFile(`../data/users/user.json`, function (err, file) {
    var json = JSON.parse(file);
    json.data[0].avatar = defaultavatar
    fs.writeFile(`../data/users/${newid}.json`, JSON.stringify(json), function(err){
      if (err) throw err;
      console.log(`File users/${newid}.json was created at [${moment().format('DD/MM/YYYY][hh:mm')}]`);
    });
  })
}

const PORT = process.env.PORT || 1;
server.listen(PORT, () =>
{if(verbose)
{
  console.log()
  log(`lore-wiki`, `Live on port ${PORT}.`)
  console.log(`::`)

}});
io.on('connection', socket =>
{
  console.log(`Connection Recieved at [${moment().format('hh:mm')}]`)
  socket.on('updateAvatar', data => {
    fs.readFile(`../data/users/${data.id}.json`, function (err, file) {
      var json = JSON.parse(file);
      json.data[0].avatar = data.base64
      fs.writeFile(`../data/users/${data.id}.json`, JSON.stringify(json), function(err){
        if (err) throw err;
      });
    })
  });
})