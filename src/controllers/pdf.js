

const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const pdfController = {}
var PdfTable = require('voilab-pdf-table')
const orderDbo = require('../models/orders') 

pdfController.generatePdf = (req,res, data)=>{
  const pdf = createBasicPdf(req,res,data)
  pdf.pipe(res)
}

function createBasicPdf(req,res,data){
  const doc = new PDFDocument(
    {
      margin:50,
      size:'A4',
    })
  let filename = req.body.filename
  let title = req.body.docTitle
  let description = req.body?.description
  filename = encodeURIComponent(filename) + '.pdf'

  generateHeader(doc)
 

  //Doc title 
  doc.fontSize(20)
  doc.text(`${title}`,50,165,{
    align: 'center'
  })

  //doc description
  doc.fontSize(14)
  doc.moveDown();
  doc.text(`${description}`,{
    align: 'justify',
  })

  createTable(doc, data)
  //headers for doc
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  
  doc.end()
  return doc
}


  function createTable(doc, data){
    const headers = Object.keys(data[0])
    let headerList=[]
    headers.forEach((item, index)=>{
      let order = new orderDbo.tableHeader(item,item,100)
      headerList.push(order)
    })

    doc.fontSize(12)
    table = new PdfTable(doc,{
    });
    table
      .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
          column: 'description',
          align:'left'
      }))
      // set defaults to your columns
      .setColumnsDefaults({
        headerBorder: ['T','B'],
        border: ['B'],
        padding: [5, 10, 5, 10],
        headerBorderOpacity : 1,
        borderOpacity : 0.5,
        align:'left'
        })
      // add table columns
      .addColumns(headerList)

      .onPageAdded(function (tb) {
        tb.addHeader();
      });

      doc.addPage();

      table.addBody(data);
  }
  
function generateHeader(doc) {
  doc
    .image('src/assets/images/Sarvedyam_brand_logo_128.png',{
      width:75
    })
    .fontSize(16)
    .text("Sarvedyam Foods", 150, 80,{
      align:'left'
    })
    .fontSize(10)
    .text("Sarvedyam Foods address", 150, 80,{
      align:'right'
    })
    .moveTo(0, 130)
    .lineTo(1000,130)
    .stroke()
    .moveTo(0,-100)
  }

  




module.exports = pdfController


