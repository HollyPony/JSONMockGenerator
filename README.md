# JSON Mock Generator

Simple mock endpoint with autogenerated / configurable return values.

The idea is to configure the return values in body request. Watether the type and the route.

The API doesn't matter the HTTP method used and the nested route called.

Online endpoint available at [https://jmgen.herokuapp.com/]()

Powered by [Node-restify](https://github.com/restify/node-restify) and [ChanceJS](https://github.com/chancejs/chancejs)

## Features

- The API doesn't matter the HTTP method used and the nested route called :
  `GET` === `PUT`
- Create random object with or without parameters
- Use a full mapped [ChanceJS](https://github.com/chancejs/chancejs) lib

## Installation

- Clone project locally
- Do `npm install` with version of node installed > 6
- Run in debug with `npm run serve` or start a server with `npm start`

## API Doc

If nothing

TODO

## Examples

#### Get a random object

Call :

```{}```

[Demo](https://jmgen.herokuapp.com/)

Result:

```
{
  "id": 2263426013331456
}
```

#### Get a list

Call :

```
{
  "__length": 3
}
```

[Demo](https://jmgen.herokuapp.com/?__length=3)

Result :

```
[
  { id: 4669038997274624 },
  { id: 2258162581241856 },
  { id: 3514527639404544 }
]
```

#### Get an object

Call :

```
{
  "name": "name",
  "birthday": "birthday",
  "city": "city",
  "genre": "male"
}
```

[Demo](https://jmgen.herokuapp.com/?__length=3)

Result :

```
{
  "name":"Nell Pittman","date":"1972-12-25T15:53:38.118Z","cite":"Seecivoc","genre":"male"}
```

#### Get an object list

Call :

```
{
}
```

[Demo](https://jmgen.herokuapp.com/?__length=3)

Result :

```
[
]
```



## Roadmap

- Create list with eight in a range
- Add Sample element (Get User ...)
- Pas url for keywords (with elements and verbs like "list")
- Insert a config file on startup (json-server like)