

const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const pdfController = {}
var PdfTable = require('voilab-pdf-table')
const orderDbo = require('../models/orders') 

pdfController.generatePdf = (req,res, data)=>{
  data = data.filter((v,i)=> i <50)
  console.log(data, 'fifty');
  const pdf = createBasicPdf(req,res,data)
  pdf.pipe(res)

}

function createBasicPdf(req,res,data){
  const doc = new PDFDocument(
    {
      margin:50,
      size:'A4',
      autoFirstPage:true
    })
  let filename = req.body.filename
  let title = req.body.docTitle
  let description = req.body?.description

  generateHeader(doc)


  filename = encodeURIComponent(filename) + '.pdf'

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


  // generateTableHeader(doc,data)
  // generateTableFeilds(doc,data)



  //headers for doc
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  
  doc.end()
  return doc
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
  
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Best dairy products in your City",
        50,
        780,
        { align: "center", width: 500 }
      );
  }

  function generateInformation(doc) {  
    doc
      .text(`Invoice Number: 123`, 50, 200)
      .text(`Invoice Date: ${new Date()}`, 50, 215)
      .text(`Balance Due: 100Rs`, 50, 130)
      .moveDown();
  }

  function generateTableRow(doc, items, y) {
    let x = 100
    items.forEach(item=>{
      doc
      .fontSize(14)
      .text(item,x, y,{ align:'left'})

      x+=100
    })

  }

  function generateTableHeader(doc,headerList){
    console.log(headerList[0]);
    const headers = Object.keys(headerList[0])
    console.log(headers);
    generateTableRow(doc, headers, 250)
  }

  function generateTableFeilds(doc, list){
    let y = 280
    list.forEach(item=>{
      let itemValues = Object.values(item)
      generateTableRow(doc, itemValues, y)
      y+= 30
    })

  
  
  }

  function createTable(doc, data){
    const headers = Object.keys(data[0])
    let headerList=[]
    headers.forEach((item, index)=>{
      let order = new orderDbo.tableHeader(item,item,120)
      headerList.push(order)
    })

    console.log(headerList);

    doc.moveTo(0,0)
    table = new PdfTable(doc,{
    });
    table
      .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
          column: 'description'
      }))
      // set defaults to your columns
      .setColumnsDefaults({
          headerBorder: 'B',
      })
      // add table columns
      .addColumns(headerList)

      .onPageAdded(function (tb) {
        tb.addHeader();
      });

      doc.addPage();

      table.addBody(data);
  }




module.exports = pdfController


