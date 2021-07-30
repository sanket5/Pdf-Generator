

const express = require('express');
const router = express.Router();

const pdfController = require('../controllers/pdf')

router.post('/pdf', (req,res,next)=>{
    pdfController.generatePdf(req,res)
})

module.exports = router