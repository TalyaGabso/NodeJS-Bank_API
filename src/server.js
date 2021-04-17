const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port =8080;

const bankRoute = require('./routes/bank.route');
const userRoute = require('./routes/users.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/bank',bankRoute);
app.use('/api/bank/users',userRoute);

app.listen(port,()=>{
    console.log(`application start at ${port}`)
})
