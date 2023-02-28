
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('addresses.csv', d3.autoType)
  .then(data => {
    console.log("data", data)


    
    const table = d3.select("#container")
      .append("table")
      .attr("style","border: 1px solid black")
      table.append("thead")
      const tbody =table.append("tbody")
        // .append("tr")
        // .attr("class","row")
      const row = tbody.selectAll("tr")
        .data(data)
        .join("tr")
        .attr("class","student")
        .attr("id",data=>data.last)
      row.append("td")
        .text(data => data.first)
      row.append("td")
        .text(data =>data.last)

    console.log(table)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

  })