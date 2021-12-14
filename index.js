const express = require("express")
const cors = require("cors")
const { getFile, writeFile } = require("./util")

const staticData = getFile('static.json')
const productsMap = staticData.products.reduce((acc, curr) => {
  acc[curr.id] = curr
  return acc
}, {})

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())

/* ---------- PRODUCTS ---------- */
app.get("/products", (req, res) => {
  const { products } = staticData
  res.json({
    products
  })
})

app.get("/product/:id", (req, res) => {
  const { params } = req
  const product = productsMap[params.id]

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

/* ---------- CART ---------- */
app.get("/cart", (req, res) => {
  const cart = getFile('cart.json')
  res.json({
    products: cart.products
  })
})
app.post("/addToCart/:id", (req, res) => {
  const { body: { quantity = 1 }, params: { id } } = req

  if (!id) {
    res.status(400).json({ message: 'No ID provided' })
    return
  }

  const cart = getFile('cart.json')
  const cartProduct = cart.products.find(p => p.id === id)

  if (cartProduct) {
    res.status(400).json({ message: 'Product already in cart' })
  } else {
    const product = productsMap[id]

    if (!product) {
      res.status(404).json({ message: `Product with {ID: ${id}} doesn't exist` })
    } else {
      if (quantity <= 0 || quantity > product.available) {
        res.status(400).json({
          message: `${quantity <= 0
            ? 'Can\'t add less than 1 product'
            : `There are not enough products (available: ${product.available}).`}`
        })
      } else {
        cart.products.push({ ...product, quantity })
        writeFile('cart.json', cart)
        res.sendStatus(200)
      }
    }
  }
})
app.post("/updateCart/:id", (req, res) => {
  const { body: { quantity = 1 }, params: { id } } = req

  if (!id) {
    res.status(400).json({ message: 'No ID provided' })
  }

  const cart = getFile('cart.json')
  const cartProductIndex = cart.products.find(p => p.id === id)

  if (cartProductIndex < 0) {
    res.status(404).json({ message: 'Product not in the cart' })
  } else {
    if (quantity <= 0 || quantity > product.available) {
      res.status(400).json({
        message: `${quantity <= 0
          ? 'Can\'t add less than 1 product'
          : `There are not enough products (available: ${product.available}).`}`
      })
    } else {
      cart.products.splice(cartProductIndex, 1, { ...productsMap[cartProductIndex], quantity })
      writeFile('cart.json', cart)
      res.sendStatus(200)
    }
  }
})
app.get("/emptyCart", (req, res) => {
  writeFile('cart.json', { products: [] })
  res.sendStatus(200)
})

/* ---------- CHECKOUT ---------- */
app.get("/checkout", (req, res) => {
  writeFile('cart.json', { products: [] })
  res.sendStatus(200)
})

/* ---------- AUTH ---------- */
app.post("/login", (req, res) => {
  console.log('login params', req.body)
  const params = req.body

  if (!params) {
    res.status(400).send({ message: 'No credentials provided' })
    return
  } else {
    if (!params.email) {
      res.status(403).send({ message: 'No email provided' })
      return
    }
    if (!params.password) {
      res.status(403).send({ message: 'No password provided' })
      return
    }
  }

  const fields = ['email', 'password']
  let valid = true
  fields.forEach(field => {
    if (params[field] !== staticData.user[field]) {
      valid = false
    }
  })

  if (valid) {
    res.sendStatus(200)
  } else {
    res.status(403).send({ message: 'Email or password are not valid' })
  }
})

/* ---------- START ---------- */
app.listen(8080, () => {
  console.log("Server is running on port 8080")
})
