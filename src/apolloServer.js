const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const { resolvers, typeDefs } = require('./graphql/index');
const store = require('./repositories');

const BookService = require('./services/BookService');
const OrderService = require('./services/OrderService');
const UserService = require('./services/UserService');
const BookLoader = require('./graphql/loaders/BookLoader');

const dataSources = () => ({
    bookService: new BookService({ store }),
    orderService: new OrderService({ store }),
    userService: new UserService({ store }),
});

const setupApolloServer = async () => {
    const app = express();
    app.use(cookieParser());
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources,
        context: ({ req, res }) => ({
            req,
            res,
            bookLoader: BookLoader(dataSources().bookService),
        }),
        // debug: true,
        playground: true,
        introspection: true,
    });

    // app.use(cookieParser());

    // app.use((req, res, next) => {
    //     try {
    //         const { token } = req.cookies;
    //         if (token) {
    //             const parsedToken = jwt.verify(token, process.env.JSON_SECRET);
    //             req.parsedToken = parsedToken;
    //         }
    //     } catch (error) {
    //         // Cookie exists but invalid => Remove it
    //         res.cookie('token', '', {
    //             httpOnly: true,
    //             expires: new Date(0), // Thu, 01 Jan 1970
    //         });
    //     }
    //     next();
    // });

    server.applyMiddleware({
        path: '/graphql',
        app,
        // cors: {
        //     origin: 'https://bookworm-two.vercel.app',
        //     credentials: true,
        // },
        bodyParserConfig: {
            limit: '5mb',
        },
    });

    // if (process.env.NODE_ENV === 'production') {
    //     const oneHour = 3600000;
    //     app.use(
    //         express.static(path.resolve(__dirname, '../client/build'), {
    //             maxAge: oneHour,
    //         })
    //     );
    //     app.get('*', (req, res) => {
    //         const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    //         res.sendFile(filePath);
    //     });
    // }

    return app.listen(5000, () => {
        console.log(`Sever is running at http://localhost:5000`);
    });
};

module.exports = setupApolloServer;
