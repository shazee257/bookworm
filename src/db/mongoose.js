const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose
        .connect('mongodb+srv://anhminhtran235:qwertyuioP_123@cluster0.zxign.mongodb.net/Bookworm?retryWrites=true', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            // console.log('Connected to MongoDb');
        });
    return mongoose;
};

module.exports = connectToDb;
