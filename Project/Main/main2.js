
//Final for Bar Plot




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
    // List of groups for the dropdwon values

    //List for the deropdown 2 that have time values
    const allGroup = ["Total", "12:00 a.m. to 4:59 a.m.", "5:00 a.m. to 5:29 a.m.","5:30 a.m. to 5:59 a.m.","6:00 a.m. to 6:29 a.m.","6:30 a.m. to 6:59 a.m.","7:00 a.m. to 7:29 a.m.","7:30 a.m. to 7:59 a.m.","8:00 a.m. to 8:29 a.m.","8:30 a.m. to 8:59 a.m.","9:00 a.m. to 9:59 a.m.","10:00 a.m. to 10:59 a.m."
  ,"11:00 a.m. to 11:59 a.m.","12:00 p.m. to 3:59 p.m.","4:00 p.m. to 11:59 p.m."]
    
  //List for dropdown 1 that have means of transportation values
  const allGroup2 =['Drove Alone','Car Pooled','Public Transport','Walked','Taxi cab and Others']
  const allGroup2values = {'Drove Alone':".1",'Car Pooled':".2","Public Transport":'.3',"Walked":'.4','Taxi cab and Others':'.5'}
    
    // add the options to the select tags for dropdown 1 and 2
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d) // text showed in the menu
      .attr("value", d => d) // corresponding value returned by the button
      d3.select("#selectButton2")
      .selectAll('myOptions2')
     	.data(allGroup2)
      .enter()
    	.append('option')
      .text(d => d) // text showed in the menu
      .attr("value", d => d) // corresponding value returned by the button
    

    // Add X axis --> it is a date format
    const x = d3.scaleBand()
      .domain(data.map(function(d) { return d.Label; }))
      .range([ 0, width ]);
    var xaxis= svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .attr("opacity", "1")
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.7em")
      .style("font-size","15px")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)"); //For rotating the text 65 degree


      
    // Add Y axis
    const y = d3.scaleLinear()
    .domain([Math.min(...data.map(d => d.Total)), Math.max(...data.map(d => d.Total))]) 
    .range([ height, 0 ]);
    yAxis =
      svg.append("g")
      .call(d3.axisLeft(y));


      
    // Initialize bars
    const hist = svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", x.bandwidth())
    .attr("height", d=> height - y(d.Total))
    .attr("x", d=>x(d.Label))
    .attr("y", d=> y(d.Total))
    .attr("fill", "steelblue")
        
    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      const dataFilter = data.map(function(d){return {Label: d.Label, Total:d[selectedGroup]} })

      // Give these new data to update line
      
      y.domain([Math.min(...data.map(d => d[selectedGroup])), Math.max(...data.map(d => d[selectedGroup]))]) 
      yAxis.transition().duration(1000).call(d3.axisLeft(y))
        
      hist
      .data(dataFilter)
          .transition()
          .duration(1000)
          .attr("x", d=>x(d.Label))
          .attr("y", d=> y(d.Total))
          .attr("width", x.bandwidth())
          .attr("height", d=> height - y(d.Total))
    };

    // When the select is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event, d) {
        // recover the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        let selectOptions2 = document.getElementById("selectButton2").value;
        if(selectedOption!="Total"){
          selectedVariable = allGroup2values[selectOptions2]
          selectedOption = selectedOption.concat(selectedVariable)
        }
        
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})