const express = require('express')
const router = require('./router');
const errorHandler = require('./midlewares/errorHandler');

const app = express()
const port = 3000

// Middleware biar Express bisa baca JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount router
app.use('/', router)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server can be run on port ${port}`);
})