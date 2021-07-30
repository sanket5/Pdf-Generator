
const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const pdfRoute = require('./src/routes/pdf')

app.use('/', pdfRoute)



app.listen(3000, ()=>{
    console.log('Server listning on 3000');
})
