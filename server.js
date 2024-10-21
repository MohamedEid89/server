const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
// dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/errorMiddleware')

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.get('/', (req, res) => {
    res.send('Hi');
});
// Mount Routes   
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);

app.all('*', (req, res, next) => {
    // Create error and send it to error handling middleware
    // const err = new Error(`Can't find this route ${req.url}`);
    next(new ApiError(`Can't find this route ${req.url}`, 400));
});

// Global error handling Middleware
app.use(globalError);
// Server connection 
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});

// Handel rejection outside express  
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
    server.close(() => {
        console.log('Server shutting down....')
        process.exit(1);
    })

});

