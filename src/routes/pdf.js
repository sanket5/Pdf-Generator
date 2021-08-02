

const express = require('express');
const router = express.Router();

const pdfController = require('../controllers/pdf')

router.post('/pdf', (req,res,next)=>{
    let data = req.body.data
    pdfController.generatePdf(req,res, data)
})

module.exports = router