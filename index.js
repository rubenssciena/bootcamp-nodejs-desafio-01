const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verificaAgeParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/major', verificaAgeParam, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', verificaAgeParam, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    res.redirect(`/major/?age=${req.body.age}`)
  } else {
    res.redirect(`/minor/?age=${req.body.age}`)
  }
})

app.listen(3000)
