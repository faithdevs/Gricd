const mongoose = require('mongoose');
const BookModel = require("../models/book");

addBook = async (res, userId, userBookshelf)=>{
    try{
       result = await UserModel.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(userId),
        },{
            $push: { bookshelf: userBookshelf },
        })
        .then((doc)=>{
            if(doc.nModified==1) return doc
            else return -1
        })
        .catch((err)=>{if(err){res.sendStatus(424); console.log("[X] [await catch addBook\]:\n====================\n"); return -1}})
        return result
    }catch(exception){
        console.log("[X] [await catch addBook\]:\n====================\n",exception);        res.sendStatus(503)
        res.sendStatus(503)
        return -1
    }
}

removeBookFromShelf = async (res, userId, bookid)=>{
    try{
        result = await UserModel.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(userId), "bookshelf.bookId": bookid },
                {
                    $pull: { bookshelf: { bookId: bookid } },
                })
                .then((doc)=>{if(doc.nModified==1)return doc; else return -2})
                .catch((err)=>{res.sendStatus(424); console.log("[X] [await catch removeBookFromShelf\]:\n====================\n",err); return -1})
        return result
    } catch(exception){
        console.log("[X] [removeBookFromShelf\]:\n====================\n")
        res.sendStatus(424)
        return -1
    }
}



module.exports = {
    addBook, 
    removeBookFromShelf,
}
