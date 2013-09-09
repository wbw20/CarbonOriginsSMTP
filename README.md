Swipe-Server
============
A very barebones node server for keeping track of buy and sell orders in the Case Swipe system.

Public API
----------
Here are some basic public rest resources with example resonses:

GET /buy
ex.
```javascript
[
  {
    id: 1,
    name: "will",
    price: 2.45
  }, {
    id: 2,
    name: "clarence",
    price: 7
  }, {
    id: 3,
    name: "pete",
    price: 3.5
  }
]
```

GET /sell
ex.
```javascript
[
  {
    id: 1,
    name: "beatrice",
    price: 4.6
  }, {
    id: 2,
    name: "sean",
    price: 3.5
  }, {
    id: 3,
    name: "patrick",
    price: 5.75
  }
]
```
