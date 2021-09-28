const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksData');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const bookModel = mongoose.model('book', bookSchema);

// localhost:3001/books
async function addBookRouter(req,res){
    let { title, description, status, email } = req.body;
    console.log(title, description, status, email);

    await bookModel.create({
        title,
        description,
        status,
        email
    })

    bookModel.find({},(error,data) => {
        if(error) {
            console.log('error in getting data',error);
        } else {
            // console.log(data)
            res.send(data);
        }
    })
}

function getBookRouter(req, res) {
    bookModel.find({},(error,data) => {
        if(error) {
            console.log('error in getting data',error);
        } else {
            // console.log(data)
            res.send(data);
        }
    })
}

function deleteBookRouter(req, res) {
    let {bookID} = req.query;

    bookModel.deleteOne({ _id: bookID }).then(() => {
        bookModel.find({}, function (error, data) {
            if (error) {
                console.log('error in getting data', error)
            } else {
                // console.log(ownerData)
                res.send(data)
            }
        })
    })
}

module.exports = {addBookRouter, getBookRouter, deleteBookRouter};