# App server

## Inizializzazione
Installare i node modules
```shell
npm install
```
oppure
```shell
yarn install
```

Nella directory `data` copiare il file `cart.sample.json` e rinominare la sua copia in `cart.json`.

## Avvio
```shell
npm start
```

## API Reference
L'url del server è `http://localhost:8080/`

### Login

**Method**
POST

**Endpoint**
`/login`

**Parameters**
```
{
  email: string
  password: string
}
```

**Response**
```
OK
```

### Get products

**Method**
GET

**Endpoint**
`/products`

**Response**
```
{
  products: [
    {
      id: string
      name: string
      price: number
      available: number
    },
    ...
  ]
}
```

### Get single product

**Method**
GET

**Endpoint**
`/product/:id`

**Response**
```
{
  id: string
  name: string
  price: number
  available: number
}
```

### Get cart

**Method**
GET

**Endpoint**
`/cart`

**Response**
```
{
  products: [
    {
      id: string
      name: string
      price: number
      quantity: number
      available: number
    },
    ...
  ]
}
```

### Add to cart

**Method**
POST

**Endpoint**
`/addToCart/:id`

**Parameters**
```
{
  quantity: number
}
```

**Response**
```
OK
```

### Update cart

**Method**
POST

**Endpoint**
`/updateCart/:id`

**Parameters**
```
{
  quantity: number
}
```

**Response**
```
OK
```

### Empty cart

**Method**
GET

**Endpoint**
`/emptyCart`

**Response**
```
OK
```
