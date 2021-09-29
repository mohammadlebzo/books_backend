const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_SERVER);

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

// localhost:3001/getbooks
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

// localhost:3001/deletebook
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

// localhost:3001/updatebook
function updateBookRouter(req, res) {
    let { title, description, status, email, _id } = req.body;
    bookModel.findByIdAndUpdate(_id, { title, description, status }, (error, updatedData) => {
        if (error) { console.log('error in updating') }
        else {
            bookModel.find({ email }, function (error, data) {
                if (error) {
                    console.log('error in getting data', error)
                } else {
                    res.send(data)
                }
            })
        }
    })
}

module.exports = {addBookRouter, getBookRouter, deleteBookRouter, updateBookRouter};