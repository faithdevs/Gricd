const {body, param, query} = require('express-validator')
const Admin = require ('../models/admin')
const Author = require('../models/author')
const Book = require('../models/book')
const Category = require('../models/category')

async function isvalidUsername (value) {
    const user = await Admin.findOne({ username: value });
    if (user) {
        return Promise.reject("Username already in use");
    }
}
function createAdmin() {
    return [
        body("username").isString().not().isEmpty().custom(isvalidUsername),
        body("password")
            .isString()
            .trim()
            .escape()
            //.isLength({ min: 7 })
            .not()
            .isEmpty()
    ];
}

function signIn() {
        return [
            body("username").isString().not().isEmpty(),
            body("password")
            .isString()
            .trim()
            .escape()
            //.isLength({ min: 7 })
            .not()
            .isEmpty()
        ];
}

//To validate Authors
async function isvalidFirstname (value) {
    const user = await Author.findOne({ fname: value });
    if (user) {
        return Promise.reject("Firstname already in use");
    }
}

async function isvalidLastname (value) {
    const user = await Author.findOne({ lname: value });
    if (user) {
        return Promise.reject("Lastname already in use");
    }
}
function createAuthor() {
    return [
        body("fname").isString().not().isEmpty().custom(isvalidFirstname),
        body("lname").isString().not().isEmpty().custom(isvalidLastname),
    ];
}

const findAuthor = () => {
    return [param("authorId").not().notEmpty()];
};


//To add books
async function isvalidBookname (value) {
    const user = await Book.findOne({ name: value });
    if (user) {
        return Promise.reject("Bookname already in use");
    }
}
function createBook() {
    return [
        body("name").isString().not().isEmpty().custom(isvalidBookname),
        
    ];
}

const findBook = () => {
    return [param("book_id").not().notEmpty()];

};

// To validate category 
async function isvalidCategoryname (value) {
    const user = await Category.findOne({ name: value });
    if (user) {
        return Promise.reject("Categoryname already in use");
    }
}
function createCategory() {
    return [
        body("name").isString().not().isEmpty().custom(isvalidCategoryname),
        
    ];
}

const findCategory = () => {
    return [param("category_id").not().notEmpty()];

};
module.exports = {createAdmin:createAdmin(), signIn:signIn(), createAuthor:createAuthor(), findAuthor:findAuthor(), createBook:createBook(), findBook:findBook(), createCategory:createCategory(), findCategory:findCategory()}