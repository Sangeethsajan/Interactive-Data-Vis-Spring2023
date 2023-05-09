
//Final for Scatter Plot




const margin = {top: 10, right: 100, bottom: 200, left: 100},
    width = 1460 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("Data-Final.csv").then(function(data) {
    console.log(data)
    // List of groups (here I have one group per column)
    const allGroup = ["Total", "12:00 a.m. to 4:59 a.m.", "5:00 a.m. to 5:29 a.m.","5:30 a.m. to 5:59 a.m.","6:00 a.m. to 6:29 a.m.","6:30 a.m. to 6:59 a.m.",
  "7:00 a.m. to 7:29 a.m.","7:30 a.m. to 7:59 a.m.","8:00 a.m. to 8:29 a.m.","8:30 a.m. to 8:59 a.m.","9:00 a.m. to 9:59 a.m.","10:00 a.m. to 10:59 a.m.","11:00 a.m. to 11:59 a.m.",
"12:00 p.m. to 3:59 p.m.","4:00 p.m. to 11:59 p.m."]
    
    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d) // text showed in the menu
      .attr("value", d => d) // corresponding value returned by the button

    

    // Add X axis --> it is a date format
    const x = d3.scaleBand()
      .domain(data.map(function(d) { return d.Label; }))
      .range([ 0, width ]);
    var xaxis= svg.append("g")
      .attr("transform", `translate(-12, ${height})`)
      .call(d3.axisBottom(x))
      .attr("opacity", "1")
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.7em")
      .style("font-size","15px")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([Math.min(...data.map(d => d.Total)), Math.max(...data.map(d => d.Total))]) 
    .range([ height, 0 ]);
    yAxis =svg.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    const line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(d => x(d.Label))
          .y(d => y(d.Total))
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    const dot = svg
      .selectAll('circle')
      .data(data)
      .join('circle')
        .attr("cx", d => x(d.Label))
        .attr("cy", d => y(d.Total))
        .attr("r", 7)
        .style("fill", "#69b3a2")
        ;

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      const dataFilter = data.map(function(d){return {Label: d.Label, Total:d[selectedGroup]} })

      // Give these new data to update line
      
      y.domain([Math.min(...data.map(d => d[selectedGroup])), Math.max(...data.map(d => d[selectedGroup]))]) 
      yAxis.transition().duration(1000).call(d3.axisLeft(y))
        
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => x(d.Label))
            .y(d => y(d.Total))
          )
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", d => x(d.Label))
          .attr("cy", d => y(d.Total))
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event, d) {
        // recover the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})