<h1 align="center"> Gricd Books API </h1> 
Gricd Books API is an API that allows users to access books and categories.

There are several features included in the API that allow users to search data by book name, author name, and category.

## Node JS
<img src="https://static.cdn-cdpl.com/source/23438/nodejs_logo_2016-image%28700x350-crop%29.png" width="400">

Node.js is software designed to develop web-based applications and is written in the syntax of the JavaScript programming language. If all this time we know JavaScript as a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so that it can also act as a programming language that runs on the server side, such as PHP, Ruby, Perl, and so on . Node.js can run on Windows, Mac OS X and Linux operating systems without the need for program code changes. Node.js has its own HTTP server library making it possible to run a web server without using a web server program such as Apache or Nginx

## Express JS
<img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" width="400">

Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like EJS, Jade, and Dust.js).

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

## REST API
<img src="https://miro.medium.com/max/1032/1*R99tA3ehTPO9BKvjYaTCuA.png" width="400">

REST (REpresentational State Transfer) is a web-based communication architecture standard that is often applied in the development of web-based services. Generally use HTTP (Hypertext Transfer Protocol) as a protocol for data communication. REST was first introduced by Roy Fielding in 2010.

On the REST architecture, the REST server provides resources (resources / data) and the REST client accesses and displays these resources for future use. Each resource is identified by URIs (Universal Resource Identifiers) or global IDs. These resources are represented in text format, JSON or XML. In general, the format uses JSON and XML.

## Built With
[![Express.js](https://img.shields.io/badge/express-4.17.1-yellow?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/npm-6.9.0-greenstyle?rounded-square)](https://www.npmjs.com/package/body-parser) [![Morgan](https://img.shields.io/badge/morgan-1.9.1-brightgreen?style=rounded-square)](https://www.npmjs.com/package/morgan) [![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=rounded-square)](https://www.npmjs.com/package/cors) [![CORS](https://img.shields.io/badge/jsonwebtoken-8.5.1-yellowgreen?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements
1. [Node JS](https://nodejs.org/en/download/)
2. [Express JS](https://expressjs.com/en/starter/installing.html)
3. [Postman](https://www.getpostman.com/)

Before starting to clone repository, it's better to read and know **Node JS**, **REST API** and **Read the Documentation** about the requirements above

## My Thought Process
- I decided to create an admin account that will enable the adding or creating of books, categories and adding authors, so that end-users can have the information displayed on demand. 
-So the admin account is created, then the admin logs in and is able to generate access token and refresh token. 
-With the access token, the admin is able to /POST books, authors and categories.
-The the endpoints to /POST requires authentication and authorization. 
-While the endpoints to /GET doesnt require authentication

### Postman Documentation
[![postman doc] (https://documenter.getpostman.com/view/12575851/UVyuQuaQ)}

## Getting Started
-  Clone this repository
-   `npm install`  to install node.js in CMD / Terminal
-   `npm install dotenv` [![dotenv](https://img.shields.io/badge/dotenv-8.1.0-orange?style=rounded-square)](https://www.npmjs.com/package/dotenv)
-  If you don't understand about .env read [dotenv](https://www.npmjs.com/package/dotenv)
- Make a new file **.env**
- Setup the database.
- Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
- Choose HTTP Method and enter the request URL.(i.e. localhost:3000/books)
- Check all **Endpoints**

## Setup Database
In MongoDb, create a database named Gricdbooks and connect using monogdb compass using ```mongodb://127.0.0.1:27017/GricdBooks```
Create Database named  **gricdbooks**  :
```
const mongoose = require('mongoose');

const MONGODB_URL ="mongodb://127.0.0.1:27017/GricdBooks"
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) console.error(err)
    else console.log("Connected To MongoDB")
})
```

```
Create Schema named **admin** :
```
const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, minLength: 3, required: true },
    password: { type: "string", required: true },
    refreshToken: { type: "string", default: null },
})
```
Create Schema named **authors** :
```
const AuthorSchema = new mongoose.Schema({

    fname: { type: String, minimumLength: 2, required: true },
    lname: { type: String, minimumLength: 2, default:""},
    photo: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
})
```
Create Schema named **books** :
```
const BookSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    photo: {type:String},
    description: { type: String, required: true },
    year: {type:String},
    ISBN: {type:String},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'author', require: true,default:"60747906318c453ac2776be8" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', require: true,default:"6074790a318c453ac2776be9" },
})
```
Create Schema named **category** :
```
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
})
```

### HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

-   `GET`  Get a resource or list of resources
-   `POST`  Create a resource
-   `PUT`  Update a resource
-   `DELETE`  Delete a resource

### HTTP Response Codes
| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `201` | `Succes`                 | The request was successful                                                          |
| `409` | `Error`        | There was a problem with the request    |



## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

```
    {
    "message": "Welcome to RESTfull API for Gricd Books",
    "author": "Faith Ugbeshe",
    "documentation": "https://github.com/faithdevs/Gricd",
    "github": "github.com/faithdevs"
    }
 ```

#### **Register**

- **Request** : **`POST /admins/signup`**
- **Response** :

  ```
    {
    "status": 201,
    {
    "message": "Admin account successfully created"
    }
  }
  ```

#### **Login**

- **Request** : **`POST /admins/login`**
- **Response** :
```
{
    "status": 201,
    {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjRiN2FiNGExMGQ3ZDM5NmMxMTQwYzAiLCJpYXQiOjE2NDkxMTM4MzMsImV4cCI6MTY0OTExNzQzM30.2qmd9nkqYYioWUdOhE9lAhwFfbk9PRL4sVB432******",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjRiN2FiNGExMGQ3ZDM5NmMxMTQwYzAiLCJpYXQiOjE2NDkxMTM4MzN9.x-nPeJE6MuzD3F1g9lDXclVMxa0fgLkkmRuc**********"
}
}
```
#### **CRUD Books Endpoint**
* **Read All Books**
  - **Request** : **`GET /books`**
  - **Response** :
```
{
    "status": 201,
    {
  "allBooks": [
    {
      "authorId": {
        "lname": "Carson",
        "_id": "624b0b36d105982c3811f066",
        "fname": "Ben"
      },
      "categoryId": {
        "_id": "624b0e6f6c2eef05b405fd04",
        "name": "Fiction"
      },
      "_id": "624b109cf0ef1c037c9b1c8c",
      "avgRating": 0,
      "name": "The yellow sun",
      "description": "asdhjhgokmfiojreihnjkewbh hwebqhygtqwugvs hi"
    },
    {
      "authorId": {
        "lname": "Grace",
        "_id": "624b0be8d255ba24c06ff088",
        "fname": "Nneba"
      },
      "categoryId": {
        "_id": "624b0ebf978c4a11d833aa44",
        "name": "Anime"
      },
      "_id": "624b15b1b3da89267cd1bad8",
      "avgRating": 0,
      "name": "Boys over flowers",
      "description": "kjnujhgtdrfhjhbkjhnlkjno;lkmol"
    },
    {
      "authorId": {
        "lname": "Carson",
        "_id": "624b0b36d105982c3811f066",
        "fname": "Ben"
      },
      "categoryId": {
        "_id": "624b0e6f6c2eef05b405fd04",
        "name": "Fiction"
      },
      "_id": "624b7ba8a10d7d396c1140c3",
      "name": "On Becoming",
      "description": "knsjgiugikshxncjwdskjcewopjsoc"
    }
  ],
  "countBooks": 3
}
}
```

### A. CRUD Category Endpoint
**1. Read All Category**
 -   **Request**  :  **`GET /categories`**
 -   **Response**  :
```
{
	"status": 201,
	[
  {
    "books": [
      "624b109cf0ef1c037c9b1c8c"
    ],
    "_id": "624b0e6f6c2eef05b405fd04",
    "name": "Fiction",
    "__v": 0
  },
  {
    "books": [
      "624b15b1b3da89267cd1bad8"
    ],
    "_id": "624b0ebf978c4a11d833aa44",
    "name": "Anime",
    "__v": 0
  },
  {
    "books": [],
    "_id": "624b7b5ea10d7d396c1140c2",
    "name": "Sci-Fi",
    "__v": 0
  }
]
}
```
**2. Read a category**
 -   **Request**  :  **`GET /category/:id`**
 -   **Response**  :
```
{
	"status": 201,
	[
  {
    "books": [
      {
        "authorId": {
          "lname": "Grace",
          "_id": "624b0be8d255ba24c06ff088",
          "fname": "Nneba"
        },
        "_id": "624b15b1b3da89267cd1bad8",
        "avgRating": 0,
        "name": "Boys over flowers"
      }
    ],
    "_id": "624b0ebf978c4a11d833aa44",
    "name": "Anime",
    "__v": 0
  }
]
}
```
**3. Create a category**
 -   **Request**  :  **`POST /categories`**
 -   **Response**  :
```
{
  "message": "Category successfully created"
}
```
