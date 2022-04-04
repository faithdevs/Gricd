const mongoose = require('mongoose');
require('dotenv').config()
const unknown = require('../config')

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    photo: {type:String},
    description: { type: String, required: true },
    year: {type:String},
    ISBN: {type:String},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'author', require: true,default:"60747906318c453ac2776be8" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category', require: true,default:"6074790a318c453ac2776be9" },
})

BookSchema.statics.getTopBooks=function (){
    return this.find().sort({avgRating:-1}).limit(5)  
}


BookSchema.post('save', async function(doc) {
    console.log('In Book Save Middleware')

    await this.model('author').findByIdAndUpdate(doc.authorId, { $push: { books: doc } }).catch((err) => {
        console.error(err)
        return res.sendStatus(503)
    })
    await this.model('category').findByIdAndUpdate(doc.categoryId, { $push: { books: doc } }).catch((err) => {
        console.error(err)
        return res.sendStatus(503)
    })
});

const BookModel = mongoose.model('book', BookSchema)
module.exports = BookModel
