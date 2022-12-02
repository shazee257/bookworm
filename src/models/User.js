const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    avatar: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    cart: [
        {
            book: {
                type: Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: Number,
        },
    ],
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
});

module.exports = model('User', userSchema);
