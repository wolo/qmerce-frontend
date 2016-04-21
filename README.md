qmerce-frontend
===============

NodeJS wrapper for the Qmerce Frontend API

## Installation

  npm install qmerce-frontend --save

## Usage

```javascript
const FrontendAPI = require('qmerce-frontend');
const api = new FrontendAPI(URL, { user: USER, password: PASSWORD });

api.createCart()
.then((cart) => {
	console.log("created cart " + cart.id);
	return cart.addItem({ 
		productId: "productId",
		quantity: 2
	});
})
.catch((err) => console.log(err));
```
