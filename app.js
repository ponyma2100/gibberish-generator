const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateGibberish = require('./generate_gibberish')
const Handlebars = require('handlebars')


Handlebars.registerHelper("setChecked", function (gridRadios, currentValue) {
  if (gridRadios == currentValue) {
    return "checked"
  } else {
    return ""
  }
})

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const gridRadios = req.body.gridRadios
  const gibberish = generateGibberish(gridRadios)
  res.render('index', { gibberish, gridRadios })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

