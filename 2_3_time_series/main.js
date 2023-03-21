const  margin = {top: 60, right: 30, bottom: 30, left: 60}
 const width = window.innerWidth * .7 - margin.left - margin.right
 const  height = window.innerHeight * .7 - margin.top - margin.bottom

/* LOAD DATA */
d3.csv('OlympicWinterData.csv', d => {
  return {
    year: +d.Year,
    medals: +d.Total_medals,
    goldMedals: +d.Number_of_Gold_Medals /* !!!!! For Stacked  */
  }
  }).then(data => {
    console.log('data :=> ', data);


  // CREATE SVG ELEMENT

const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")"); 

  // SCALES

const  xScale = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.year; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale).ticks(d3.count(data,d=>d.medals)).tickFormat(d3.format("d")));
  //console.log(d3.count(data))
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.medals; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(yScale));

  //For Stacked Area Chart
var stack = d3.stack().keys(['medals','goldMedals'])
var colors = ['lavender','silver']
var stackerData = stack(data)
console.log(stackerData)

svg.selectAll("g.series")
      .data(data)
      .enter()
      .append("g")
      .attr("class","series")

svg.append("path")
      .datum(data)
      .attr("fill", function(d,i){return colors[i];})
      .attr("stroke", "#111111")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return xScale(d.year) })
        .y0(yScale(0))
        .y1(function(d) { return yScale(d.medals) })
        
        )    
svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "25px")
        .attr("x", width/2)
        .attr("y", height + 50)
        .text("Year")
    
svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size", "25px")
        .attr("y", -margin.left+0)
        .attr("x", -margin.top-120)
        .text("Total Medals");

svg.append("text")
        .attr("text-anchor", "middle")
        .style("fill", "blue")
        .style("font-size", "2em")
        .attr("x", width/2)
        .attr("y", 45 - margin.top )
        .text("Winter Olympics Medals by USA")
})