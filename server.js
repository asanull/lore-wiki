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

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
)

const users = []

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

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { username: req.user.username })
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
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})

app.use(express.static(path.join(__dirname, 'public')));

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
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

io.on('connection', socket =>
{
  console.log(`Connection Recieved.`)
})

function log(title, message)
{
  file = title
  title = title.toUpperCase()
  console.log(`[${title}] ${message}`)
  fs.appendFileSync(`../logs/${file}.log`, `[${title}] ${message} [${moment().format('DD/MM/YYYY][hh:mm')}]\r\n`);
}

const PORT = process.env.PORT || 80;

server.listen(PORT, () =>
{if(verbose)
{
  console.log()
  log(`lore-wiki`, `Live on port ${PORT}.`)
  console.log(`::`)

}});