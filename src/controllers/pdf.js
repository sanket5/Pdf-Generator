

const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const pdfController = {}

pdfController.generatePdf = (req,res)=>{
    const doc = new PDFDocument({margin:50})
    let filename = req.body.filename
    filename = encodeURIComponent(filename) + '.pdf'
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    const content = req.body.content
    generateHeader(doc)
    generateInformation(doc)
    generateFooter(doc)

    doc.end()
    doc.pipe(res)
}

function generateHeader(doc) {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Sarvedyam Foods", 110, 57)
      .fontSize(10)
      .text("Wardha", 200, 65, { align: "right" })
      .text("Wardha", 200, 80, { align: "right" })
      .moveDown();
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

//   function generateTableRow(doc) {
//     doc
//       .fontSize(10)
//       .text(c1, 50, y)
//       .text(c2, 150, y)
//       .text(c3, 280, y, { width: 90, align: "right" })
//       .text(c4, 370, y, { width: 90, align: "right" })
//       .text(c5, 0, y, { align: "right" });
//   }

//   function generateInvoiceTable(doc, invoice) {
//     let i,
//       invoiceTableTop = 330;
  
//     for (i = 0; i < invoice.items.length; i++) {
//       const item = invoice.items[i];
//       const position = invoiceTableTop + (i + 1) * 30;
//       generateTableRow(
//         doc,
//         position,
//         item.item,
//         item.description,
//         item.amount / item.quantity,
//         item.quantity,
//         item.amount
//       );
//     }
//   }

module.exports = pdfController


