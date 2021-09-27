const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksData');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const bookModel = mongoose.model('book', bookSchema);

function seedBookInformation() {
    const book1 = new bookModel({
        title: 'title Book 1',
        description: 'description Book 1',
        status: 'status Book 1',
        email: 'mohlebzo1@gmail.com'
    })
    const book2 = new bookModel({
        title: 'title Book 2',
        description: 'description Book 2',
        status: 'status Book 2',
        email: 'mohlebzo1@gmail.com'
    })
    const book3 = new bookModel({
        title: 'title Book 3',
        description: 'description Book 3',
        status: 'status Book 3',
        email: 'mohlebzo1@gmail.com'
    })

    book1.save();
    book2.save();
    book3.save();
}

seedBookInformation();

// localhost:3001/books
function getBookRouter(req,res){
    bookModel.find({},(error,data) => {
        if(error) {
            console.log('error in getting data',error);
        } else {
            // console.log(data)
            res.send(data);
        }
    })
}

module.exports = getBookRouter;