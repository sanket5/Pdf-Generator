

const express = require('express');
const router = express.Router();
const order = require('../controllers/order')

const pdfController = require('../controllers/pdf')

router.post('/pdf', (req,res,next)=>{
    order()
        .then(res=>res.json())
        .then(data=> {
            pdfController.generatePdf(req,res, data)
        })
        .catch(err=>{
            console.log(err, 'err');
        })
})

module.exports = router