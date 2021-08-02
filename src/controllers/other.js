
  
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