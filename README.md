# TrochaJS

An standalone library to print valid URLs, ideal for RESTful frontEnd big projects.

## Why this library exist

This library take inspiration from Ruby routing system, where you describe the routes via a simple name tree and call those routes via dinamic function naming, preventing use of string in views and controllers.

> Ugly code example

```javascript
theRoute = "https://my.domain.com.co/product/" +
myProduct.id +
"/buy" +
"?quantity=" +
sell.quantity;
```
> Objective code example

```javascript
theRoute = myRoutes.product.buy.path( {
	product_id: myProduct.id,
	query: {quantity: sell.quantity}
});
```
> This will print

```bash
https://my.domain.com.co/product/<product_id>/buy?quantity=<sell.quantity>
```

Please see the full docs at [here: https://dfoxpro.github.io/trochaJS](https://dfoxpro.github.io/trochaJS)
