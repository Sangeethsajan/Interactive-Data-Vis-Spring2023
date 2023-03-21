
const  margin = {top: 30, right: 30, bottom: 30, left: 150};
const width = window.innerWidth * .7 - margin.left - margin.right;
const  height = window.innerHeight * .7 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('usa-polio-cases.csv', d3.autoType)
  .then(data => {
    console.log("data", data);

const svg = d3.select("#container")
    .append("svg")
    .attr("width", width + margin.left + margin.right )
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

    /* SCALES */

// const extent = d3.extent(data)
// let p = data(data.age);
// let extent = d3.extent(p);
const xScale = d3.scaleLinear()
    .domain([d3.min(data.map(d => d.Year))-10, d3.max(data.map(d => d.Year))])
    .range([ 0, width ])
    .nice()
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
    
    
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.polio_deaths)])
    .range([ height , margin.top])
    .nice();
  svg.append("g")
    .call(d3.axisLeft(yScale));
        

    /* HTML ELEMENTS */
var tooltipForData = d3
.select("body")
.append("div")
.attr("id", "tooltip")
.style("opacity", 0);

svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.Year) )
.attr("cy", d => yScale(d.polio_deaths) )
.attr("r", d=>d.polio_deaths/150)
.attr("label",d=>d.polio_deaths)
.style("fill", "red")

.on('mouseover', function(event,d) {
d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
tooltipForData.transition().duration(100).style("opacity", 0.95);
tooltipForData
  .html(
    "<span>Year: </span>" +
    d.Year +
    "<br>" +
     "<span>Polio Deaths: </span>" +
    d.polio_deaths +
    "<br>" +
     "<span>Polio Cases: </span>" +
    d.polio_cases
     )
})
.on('mouseout', function() {
  d3.select(this).attr('stroke', null);
  tooltipForData.transition().duration(100).style("opacity", 0);

});

//.style("fill", d => colorScale(d.Year));
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/1.5)
    .attr("y", 550)
    .style("font-size", "1.5em")
    .text("Year")
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -90)
    .attr("x", -margin.top-150)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "1.5em")
    .text("Deaths");
svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top - 20)
    .attr("text-anchor", "middle")
    .style("fill", "blue")
    .style("font-size", "2em")
    .text("Polio Deaths in USA from 1900 to 2020")    
  
  });