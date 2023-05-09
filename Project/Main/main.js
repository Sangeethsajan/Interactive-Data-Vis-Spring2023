var margin = {top: 50, right: 30, bottom: 200, left: 100},
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv('data3.csv', d3.autoType)
.then(data => {
  const states =[]
  const values =[]

  for (key in data[0]){
  states.push(key);
  values.push(data[0][key])
}
states.shift()
values.shift()


var numvalues = values.map(function(str) {
  // using map() to convert array of strings to numbers
  return parseFloat(str.replace(/,/g, ''));; });

var newdata = []
for (let i=0; i<states.length; i++){
  newdata.push({
    state:states[i],
    pop:numvalues[i]
  })
  //console.log(censusObject)
}

  //Adding X Axis
  var x = d3.scaleBand()
    .domain(states)
    .range([ 0, width ]);
  svg.append("g")
    .attr("class","myXaxis")
    .attr("transform", "translate(-12," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "1")
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.7em")
    .style("font-size","15px")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // Adding Y axis
  var y = d3.scaleLinear()
    .domain([Math.min.apply(Math,numvalues), Math.max.apply(Math,numvalues)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

    svg.append('g')
    .selectAll("dot")
    .data(newdata)
    .enter()
    .append("circle")
      .attr("cx", d=>x(d.state) )
      .attr("cy", d=>y(d.pop) )
      .attr("r", 6)
      .style("fill", "#69b3a2")
      .append("title")
      .text(function(d){return "State:"+d.state+"\nTotal Vehicles:"+d.pop})
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(x)

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", 500)
    .style("font-size", "1.5em")
    .text("States")
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -95)
    .attr("x", -margin.top)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "1.5em")
    .text("Vehicle Count");  
  
  
})


